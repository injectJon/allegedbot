import { GUILDS } from '../globals';

export function isAdmin( message ) {
  // If guild doesn't have assigned admin roles, all users are admin
  if ( GUILDS[ message.guild.id ].adminRoles.length < 1 ) {
    return true;
  }

  const guildRoles = GUILDS[ message.guild.id ].adminRoles;
  const authorRoles = message.member.roles.array();
  const adminRoles = authorRoles.map( r => {
    let adminRole;

    guildRoles.forEach( gr => {
      if ( gr.name === r.name ) {
        adminRole = r
      }
    } )

    return adminRole;
  })

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
        GUILDS[ result.guild.guildId ].adminRoles = [];
        console.log( `${ guild.name } has been added to the database` );
      } );
  } );
}
