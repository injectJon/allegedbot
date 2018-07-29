require( 'dotenv' ).config();
import Discord from 'discord.js'
import { fetchGuilds, fetchCommands, createGuild, updateGuild } from './utils/apiRequests';
import { checkGuilds } from './utils';
import { commandHandler } from './handlers';
import { GUILDS } from './globals';

const client = new Discord.Client();

// When the client has connected to discord
client.on( 'ready', () => {
  console.log( 'Loaded commands from database.')
  console.log( `Logged in as ${ client.user.tag }`)

  checkGuilds( client.guilds.array() );

} );

// When the bot has connected to a guild
client.on( 'guildCreate', ( guild ) => {
  console.log( `Joined the ${ guild.name } guild, updating database.` );
  if ( !GUILDS[ guild.id ] ) {
    checkGuilds( client.guilds.array() );
    return;
  }

  const newGuild = GUILDS[ guild.id ];
  newGuild.active = true;

  updateGuild( newGuild )
    .then( updatedGuild => {
      GUILDS[ guild.id ] = updatedGuild;

      // Message on entering server
      // guild.defaultChannel.send(
      //   'Thanks for the invite! The last step for setup is to use the !adminRoles command.'
      // );
    } );
} );

// When the bot has left a guild
client.on( 'guildDelete', ( guild ) => {
  console.log( `Left the ${ guild.name } guild, updating database.` );

  const newGuild = GUILDS[ guild.id ];
  newGuild.active = false;
  newGuild.adminRoles = new Array();

  updateGuild( newGuild )
    .then( updatedGuild => {
      GUILDS[ guild.id ] = updatedGuild;
    } )
} );

// When the bot hears a message in a guild
client.on( 'message', message => {

  if ( !message.guild.available ) return;

  console.log( `[${ message.guild.name }] ${ message.author.username }: ${ message.content }` );

  if ( message.author.id === client.user.id ) return;

  commandHandler( message );
} );

// When a role was created on a server
client.on( 'roleCreate', ( role ) => {
  const guild = GUILDS[ role.guild.id ];

  const roleMatches = guild.adminRoles.filter( r => r.name === role.name );

  if ( roleMatches.length >= 1 ) return; // For some reason this role already exists in the db

  guild.adminRoles.push( role );

  updateGuild( guild );

} );

// When a role was deleted on a server
client.on( 'roleDelete', ( role ) => {
  const guild = GUILDS[ role.guild.id ];

  const roleMatches = guild.adminRoles.filter( r => r.name === role.name );

  if ( roleMatches.length < 1 ) return; // For some reason this role didn't exist in the db

  guild.adminRoles.forEach( ( r, i ) => {
    if ( r.id !== role.id ) return;

    guild.adminRoles.splice( i, 1 );
    updateGuild( guild );
  } );

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
