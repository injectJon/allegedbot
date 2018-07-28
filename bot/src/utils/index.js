import { GUILDS } from '../globals';

export function isAdmin( message ) {
  const adminRoleName = 'AllegedBot Admin';
  const modRoleNames = 'moderator mod admin administrator '
  const authorRoles = message.member.roles.array();
  const adminRole = authorRoles.filter( role => role.name === adminRoleName || modRoleNames.includes( role.name.toLowerCase() ) );

  return (adminRole.length >= 1 ) ? true : false;
}

export function checkGuilds( guilds ) {
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
