import { isAdmin } from '../../utils';
import { commandTools } from '../index';
import { createCommand } from '../../utils/apiRequests';
import { GUILDS } from '../../globals';

export function addcmdCommand( message ) {

  if ( !isAdmin( message ) ) {
    return;
  }

  const parts = message.content.split( ' ' );
  const args = parts.slice( 1 );

  const command = {
    code: args.shift(),
    args: args,
  }

  if (args.length === 0) {
    message.reply('Add a custom command: ```!addcmd <code> <contents>```' +
      '\noptions available within contents:  ```{messagesender}, {@randomuser}```');
    return;
  }

  if (command.args.length < 1) {
    // Command wouldnt have any response output
    return;
  }

  let commandExists = false;
  if ( GUILDS[ message.guild.id ].commands.length > 0 ) {
    commandExists = GUILDS[ message.guild.id ].commands.filter( cmd => cmd.code === command.code );
    console.log( commandExists );
  }

  if ( commandExists.length > 0 ) {
    message.reply('Custom command already exists.');
    return;
  }

  const tools = [];
  let complex = false;

  command.args.forEach( arg => {
    commandTools.find( tool => {
      if ( tool.code !== arg ) return;

      complex = true;
      tools.push( tool.code );
    } );
  } );

  const cmd = {
    guildId: GUILDS[ message.guild.id ]._id,
    code: command.code,
    response: command.args.join( ' ' ),
    complex,
    tools,
  };

  createCommand( cmd.guildId, cmd.code, cmd.response, cmd.complex, cmd.tools  )
    .then( command => {
      GUILDS[ message.guild.id ].commands.push( command );
      message.reply( 'Command added successfully' );
    } );
}
