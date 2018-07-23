import { isAdmin } from '../../utils';
import { commandTools } from '../index';
import { GUILDS } from '../../globals';
import { updateCommand } from '../../utils/apiRequests';


export function editcmdCommand( message ) {

  if (!isAdmin( message )) {
    return;
  }

  const parts = message.content.split( ' ' );
  const args = parts.slice( 1 );

  const proposedCommand = {
    code: args.shift(),
    args: args,
  }

  if (proposedCommand.args.length === 0) {
    message.reply('Edit a command: \n```!editcmd <code> <edited contents>```' +
    '\nOptions available within contents:' +
    '\n```{messagesender}, {@randomuser}```');
    return;
  }

  // if (args.length < 2 && args.length > 0) {
  //   message.reply('No edited content was found.');
  //   return;
  // }

  const commandIndex = GUILDS[ message.guild.id ].commands.findIndex( cmd => cmd.code === proposedCommand.code );
  const command = GUILDS[ message.guild.id ].commands[ commandIndex ];

  if ( !command ) {
    message.reply( `The command '${ proposedCommand.code }' doesn't exist.` )
    return;
  }

  const _id = command._id;
  const tools = [];
  let complex = false;

  proposedCommand.args.forEach( arg => {
    commandTools.find( tool => {
      if ( tool.code !== arg ) return;

      complex = true;
      tools.push( tool.code );
    } );
  } );

  const modifiedCommand = {
    _id,
    guildId: GUILDS[ message.guild.id ]._id,
    code: proposedCommand.code,
    response: proposedCommand.args.join( ' ' ),
    complex,
    tools,
  };

  updateCommand( modifiedCommand )
    .then( result => {
      if ( !result.success ) return;

      GUILDS[ message.guild.id ].commands.splice( commandIndex, 1, result.command );
      message.reply( `The command '${ modifiedCommand.code }' was successfully updated.` );
    } );
}
