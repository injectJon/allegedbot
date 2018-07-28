require( 'dotenv' ).config();
import Discord from 'discord.js'
import { fetchGuilds, fetchCommands, createGuild, updateGuild } from './utils/apiRequests';
import { commandHandler } from './handlers';
import { GUILDS } from './globals';

const client = new Discord.Client();

function checkGuilds() {
  // All guilds the client is currently handling
  const guilds = client.guilds.array();

  // If a guild is missing from the database, add it
  guilds.forEach( guild => {

    if ( GUILDS[ guild.id ] ) return;

    createGuild( guild )
      .then( result => {
        GUILDS[ result.guild.guildId ] = result.guild
        GUILDS[ result.guild.guildId ].commands = [];
        console.log( `${ guild.name } has been added to the database` );
      } );
  } );
}

client.on( 'ready', () => {
  console.log( 'Loaded commands from database.')
  console.log( `Logged in as ${ client.user.tag }`)

  checkGuilds();

} );

client.on( 'guildCreate', ( guild ) => {
  console.log( `Joined the ${ guild.name } guild, updating database.` );
  if ( !GUILDS[ guild.id ] ) {
    checkGuilds();
    return;
  }

  const newGuild = GUILDS[ guild.id ];
  newGuild.status = true;

  updateGuild( newGuild )
    .then( updatedGuild => {
      GUILDS[ guild.id ] = updatedGuild;
    } );

  // if bot admin role doesnt exist, create one
  let roles = guild.roles.array();
  const modRoles = 'moderator mod administrator admin';
  roles = roles.filter( role => modRoles.includes( role.name.toLowerCase() ) || role.name === 'AllegedBot Admin' );
  if ( roles.length === 0 ) {
    guild.createRole( { name: 'AllegedBot Admin' } );
  }


} );

client.on( 'guildDelete', ( guild ) => {
  console.log( `Left the ${ guild.name } guild, updating database.` );
  const newGuild = GUILDS[ guild.id ];
  newGuild.status = false;
  updateGuild( newGuild )
    .then( updatedGuild => {
      GUILDS[ guild.id ] = updatedGuild;
    } )
} );

client.on( 'message', message => {

  if ( !message.guild.available ) return;

  console.log( `[${ message.guild.name }] ${ message.author.username }: ${ message.content }` );

  if ( message.author.id === client.user.id ) return;

  commandHandler( message );
} );

function startup() {
  return new Promise( resolve => {
    console.log( 'Fetching guilds...' );

    fetchGuilds()
      .then( guilds => {

        console.log( `Loaded ${ guilds.length } guilds from database.` );
        console.log( 'Fetching custom commands for guilds...' );

        // We dont want to search for commands unless we have servers
        if ( guilds.length < 1 ) resolve();

        guilds.forEach( ( guild, i ) => {

          fetchCommands( guild )
            .then( commands => {
              guild.commands = commands;
              GUILDS[ guild.guildId ] = guild;

              if ( i === guilds.length - 1 ) {
                resolve();
              }
            } );
        } );
      } );
  } );
}

startup().then( () => {
  client.login( process.env.DISCORD_TOKEN )
} );
