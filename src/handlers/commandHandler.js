import { internalCommands, commandTools } from '../commands';
import { CustomCommand } from '../model';

export function commandHandler(context) {
  const { message, server } = context;

  if (!message.content.startsWith('!')) {
    return;
  }

  const parts = message.content.substring(1).split(/\s+/);
  const commandStr = parts[0];  // removed '.toLowerCase' because it prevented people's cmds from working.

  context.args = parts;
  context.command = context.args.shift();


  // check for internal commands
  const commandDef = internalCommands.find(cmd => cmd.command === commandStr);
  if (commandDef) {
    commandDef.handler(context);
    return;
  }
  // check for custom commands
  if (server) {
    CustomCommand.findByCode(server.serverId, commandStr)
      .then(customCommand => {
        if (customCommand) {
          if (!customCommand.complex) {
            message.reply(customCommand.response);
          }

          const complexResponse = customCommand.response.split(/\s+/);
          let newResponse = [];
          commandTools.find(tool => {
            if (complexResponse.indexOf(tool.code) !== -1) {
              newResponse = tool.handler(complexResponse, message);
              console.log(`here1 ${newResponse}`);
            }
          });

          const response = newResponse.join(' ');
          message.reply(response);
        }
      })
      .catch(err => {
        console.log(`Error while looking up custom commands ${err}`);
      });
  }
}
