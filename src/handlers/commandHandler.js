import { internalCommands, commandTools } from '../commands';

import { GUILDS } from '../globals';

export function commandHandler( message ) {

  // Only process commands
  // if (!message.content.startsWith('!')) {
  //   return;
  // }

  const guild = GUILDS[ message.guild.id ];
  const parts = message.content.split(/\s+/);
  const command = {
    code: parts.shift(),
    args: parts,
  };

  // Check for internal commands
  const commandDef = internalCommands.find( cmd => cmd.command === command.code );
  if ( commandDef ) {
    commandDef.handler( message );
    return;
  }

  // Check for custom commands
  if ( guild ) {
    guild.commands.forEach( cmd => {
      if ( cmd.code !== command.code ) return;

      if ( !cmd.complex ) {
        message.reply( cmd.response );
        return;
      }

      const complexResponse = cmd.response.split(/\s+/);
      let completedResponse = [];

      commandTools.find( tool => {
        if ( complexResponse.indexOf( tool.code ) !== -1 ) {
          completedResponse = tool.handler( message, cmd.response );
        }
      } );

      message.reply( completedResponse );
    } );
  }
}
