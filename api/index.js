require( 'dotenv' ).config();
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );

// lore foundry imports
const fs = require( 'fs' );
const parser = require( 'xml2json' );
const fetch = require( 'node-fetch' );

// Mongoose Models
const Guild = require( './models/Guild' );
const CustomCommand = require( './models/CustomCommand' );

mongoose.connect( process.env.MONGODB_URI );

// Middleware
app.use( (req, res, next) => {
  // if ( !process.env.PORT ) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  // }
});
app.use( ( req, res, next ) => {
  if ( req.method === 'GET' && req.originalUrl === '/' ) {
    next();
  } else if ( !req.headers.authorization || !req.headers.authorization.includes( process.env.ALLEGEDBOT_API_KEY ) ) {
    return res.json( { success: false, error: 'Authorization Error' } );
  } else {
    next();
  }
} );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );


app.get( '/', ( req, res ) => {
  res.redirect( process.env.GITHUB_REPO );
} );

// Fetch all guilds
app.get( '/api/guilds', ( req, res ) => {
  Guild.find( {}, ( err, guilds ) => {
    if ( err ) {
      res.json( { success: false, error: err } );
      return;
    }

    res.json( { success: true, guilds } );
  } );
} );

// Create new guild
app.post( '/api/guilds', ( req, res ) => {
  const guildId = req.body.guildId;
  const admins = req.body.admins;

  Guild.create( {
    guildId,
    admins,
  }, ( err, guild ) => {
    if ( err ) {
      res.json( { success: false, error: err } );
      return;
    }

    res.json( { success: true, guild } );
  } );
} );

// Update guild
app.put( '/api/guilds/:id', ( req, res ) => {
  const guildId = req.params.id;
  const guild = req.body.guild;
  const query = { _id: guildId };

  Guild.findOneAndUpdate(
    query,
    guild,
    { new: true },
    ( err, updatedGuild ) => {
      if ( err ) {
        res.json( { success: false, error: err } );
        return;
      }

      res.json( { success: true, updatedGuild } );
    }
  )

} );

// Fetch all commands for a specific guild
app.get( '/api/:guild_id/commands', ( req, res ) => {
  const guild_id = req.params.guild_id

  // get list of commands for server
  CustomCommand
    .find( { guildId: guild_id } )
    .exec( ( err, commands ) => {
      if ( err ) {
        res.json( { success: false, error: err } );
        return;
      }

      // send list of commands as response
      res.json( { success: true, commands } );
    } )
} );

// Delete a custom command
app.delete( '/api/:guild_id/commands/:id', ( req, res ) => {
  const command_id = req.params.id;

  CustomCommand.deleteOne( { '_id': command_id }, ( err ) => {
    if ( err ) {
      res.json( { success: false, error: err } );
      return;
    }

    res.json( { success: true, command_id } );
  } );

} );

// Create new custom command
app.post( '/api/:guild_id/commands', ( req, res ) => {
  const guild_id = req.body.guildId;
  const code = req.body.code;
  const response = req.body.response;
  const complex = req.body.complex;
  const tools = req.body.tools;

  CustomCommand.create( {
    guildId: guild_id,
    code,
    response,
    complex,
    tools,
  }, ( err, command ) => {
    if ( err ) {
      res.json( { success: false, error: err } );
      return;
    }
    res.json( { success: true, command: command } );
  } );
} );

// Update custom command
app.put( '/api/:guild_id/commands/:id', ( req, res ) => {

  const command_id = req.params.id;


  const query = { _id: command_id };

  CustomCommand.findOneAndUpdate(
    query,
    { // updated command
      guildId: req.body.guildId,
      code: req.body.code,
      response: req.body.response,
      complex: req.body.complex,
      tools: req.body.tools,
    },
    { new: true }, // returns the modified command, not the original
    ( err, updatedCommand ) => {
      if ( err ) {
        res.json( { success: false, error: err } );
        return;
      }

      res.json( { success: true, command: updatedCommand } );
    }
  );
} );

// lore foundry
// fetch updated rss feed of shows and parse on an interval
const url = `https://thelorefoundry.libsyn.com/rss`;
let lorefoundry_shows;

const fetchRssFeed = () => {
  return new Promise( ( resolve, reject ) => {
      fetch( url )
          .then( res => {
              const dest = fs.createWriteStream( './rss.xml' );
              res.body.pipe( dest );
              res.body.on( "error", ( err ) => {
                  dest.close();
              } );
              dest.on( "finish", () => {
                  dest.close();
                  fs.readFile( './rss.xml', ( err, rss ) => {
                      const json = parser.toJson( rss, { object: true, coerce: true } );
                      resolve( json.rss.channel.item );
                  } );
              } );
          } );
  } );
}

const parseFeed = () => {
  fetchRssFeed().then( episodes => {
    // parse into object of relevent episode info
    // console.log( episodes[0] );
    const ep = episodes[ 0 ];
    const formattedEpisodes = episodes.map( ep => {
        return {
            title: ep.title,
            pubDate: ep.pubDate,
            description: ep[ 'itunes:summary' ],
            url: ep.enclosure.url,
            meta: {
                length: ep.enclosure.length,
                duration: ep[ 'itunes:duration' ],
                season: ep[ 'itunes:season' ],
                episode: ep[ 'itunes:episode' ],
            },
        };
    } );
  
    lorefoundry_shows = formattedEpisodes;
    console.log('length', lorefoundry_shows.length );
  } );
};

parseFeed();
setInterval( () => parseFeed(), 60000 );

// lore foundry
// get request from client for rss feed of shows
app.get( '/api/lorefoundry/rss', ( req, res ) => {
  res.json( { success: true, shows: lorefoundry_shows } );
} )

const port = process.env.PORT || 3000;
app.listen( port, () => console.log( `Listening on port ${ port }.` ) );
