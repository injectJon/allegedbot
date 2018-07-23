import { isAdmin } from '../../utils';
import { deleteCommand } from '../../utils/apiRequests';
import { GUILDS } from '../../globals';

export function delcmdCommand( message ) {

  // if (!isAdmin(context)) {
  //   return;
  // }

  const parts = message.content.split( /\s+/ );
  const code = parts[ 1 ];

  if (parts.length < 2) {
    message.reply('Delete a command: ```!delcmd <code>```' +
    '\nMultiple commands may be deleted at the same time.');
    return;
  }

  const commandIndex = GUILDS[ message.guild.id ].commands.findIndex( cmd => cmd.code === code );
  const command = GUILDS[ message.guild.id ].commands[ commandIndex ];

  if ( !command ) {
    message.reply( `The command '${ code }' doesn't exist.` );
    return;
  }

  deleteCommand( command._id )
    .then( result => {
      if ( !result.success ) return;

      GUILDS[ message.guild.id ].commands.splice( commandIndex, 1 );

      message.reply( `The command '${ code }' was successfully deleted.` );
      return;
    } );
}
