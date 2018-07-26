require( 'dotenv' ).config();
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );

// Mongoose Models
const Guild = require( './models/Guild' );
const CustomCommand = require( './models/CustomCommand' );

mongoose.connect( process.env.MONGODB_URI );

// Middleware
app.use( (req, res, next) => {
  // if ( !process.env.PORT ) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  // }
});
app.use( ( req, res, next ) => {
  if ( req.method === 'GET' && req.originalUrl === '/' ) {
    next();
  }

  if ( !req.headers.authorization || !req.headers.authorization.includes( process.env.ALLEGEDBOT_API_KEY ) ) {
    return res.json( { success: false, error: 'Authorization Error' } );
  }

  next();
} );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );


app.get( '/', ( req, res ) => {
  res.redirect( process.env.GITHUB_REPO );
} );

app.get( '/guilds', ( req, res ) => {
  Guild.find( {}, ( err, guilds ) => {
    if ( err ) {
      res.json( { success: false, error: err } );
      return;
    }

    res.json( { success: true, guilds } );
  } );
} );

app.post( '/guilds', ( req, res ) => {
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

app.put( '/guilds/:id', ( req, res ) => {
  const guildId = req.params.id;
  const status = req.body.status;
  const query = { _id: guildId };

  Guild.findOneAndUpdate(
    query,
    {
      active: status,
    },
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

app.put( '/guilds/:id/features', ( req, res ) => {
  const guildId = req.params.id;
  const feature = req.body.feature;
  const state = req.body.state;
  const query = { _id: guildId };

  const updatedFeature = {};
  updatedFeature[ feature ] = state;

  Guild.findOneAndUpdate(
    query,
    updatedFeature,
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

// Bot client will fetch all commands at startup
app.get( '/:guild_id/commands', ( req, res ) => {
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

// Delete a custom command from the db
app.delete( '/:guild_id/commands/:id', ( req, res ) => {
  const command_id = req.params.id;

  CustomCommand.deleteOne( { '_id': command_id }, ( err ) => {
    if ( err ) {
      res.json( { success: false, error: err } );
      return;
    }

    res.json( { success: true, command_id } );
  } );

} );

// Create new custom command in the db
app.post( '/:guild_id/commands', ( req, res ) => {
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

// Update custom command in the db
app.put( '/:guild_id/commands/:id', ( req, res ) => {

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

function checkApiKey( req, res ) {
  const key = req.body.apiKey;

  if ( key === process.env.BOT_CLIENT_API_KEY ) {
    // Not authorized
    return true;
  }

  return false;
}

const port = process.env.PORT || 3000;
app.listen( port, () => console.log( `Listening on port ${ port }.` ) );
