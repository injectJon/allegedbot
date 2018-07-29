import { isAdmin } from '../../utils';
import { GUILDS } from '../../globals';
import { updateGuild } from '../../utils/apiRequests';

export function adminRolesCommand( message ) {

  if ( !isAdmin( message ) ) return;

  const guild = GUILDS[ message.guild.id ];

  const args = message.content.split( /\s+/ ).slice( 1 );

  const options = [ 'add', 'remove' ];
  const flags = message.guild.roles.array().map( role => role.name );
  console.log( flags );

  const option = args.shift().toLowerCase();
  const flag = args.shift().toLowerCase;

  if ( !options.includes( option ) ) {
    message.reply( `Unknown option '${ option }'` );
    return;
  }

  if ( !flags.includes( flag ) ) {
    message.reply( `That role doesn't exist on this server.` );
    return;
  }

  // Check that proposed role is below the author's highest role in heirarchy
  const roles = message.guild.roles.array();
  const role = roles.filter( r => r.name.toLowerCase() === flag );
  const authorRoles = message.member.roles.array().map( r => r.calculatedPosition );
  const authorHighestRole = Math.min.apply( Math, authorRoles );

  if ( role[ 0 ].calculatedPosition < authorHighestRole ) {
    // proposed role is higher in hierarchy that authors, can't modify role priviledges
    return;
  }

  const state = ( option === 'add' );

  if ( state ) {
    // add the guild role to the GUILD entry and DB
    guild.adminRoles.push = role[ 0 ];
  } else {
    // remove the guild role from the GUILD entry and DB
    guild.adminRoles.forEach( ( r, i ) => {
      if ( r.name !== role.name ) {
        return;
      }

      guild.adminRoles.splice( i, 1 );
    } );

    // Update guild
    updateGuild( guild )
      .then( updatedGuild => {
        GUILDS[ message.guild.id ] = updatedGuild;
        message.reply( `Successfully added '${ flag }' to admin roles.`)
      } )
  }
}