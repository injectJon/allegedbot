import { CustomCommand } from '../model';
import { isAdmin } from '../utils';
import { commandTools } from './index';

export function addcmdCommand(context) {
  const { message, server, args } = context;

  if (!server) return;

  if (!isAdmin(server, message)) {
    return;
  }

  if (args.length === 0) {
    message.reply('format:  !addcmd <code> <contents>' +
      '\noptions available within contents:  {messagesender}');
  }

  if (args.length < 2 && args.length > 0) {
    message.reply('Try harder..');
    return;
  }

  const code = args[0];

  CustomCommand.findByCode(server.serverId, code)
    .then(cc => {
      if (cc) {
        message.reply('Custom command already exists.');
        return undefined;
      }

      let complex = false;
      const tools = [];

      args.forEach(word => {
        commandTools.find(tool => {
          if (tool.code === word) {
            complex = true;
            tools.push(tool.code);
          }
        });
      });

      const response = args.slice(1).join(' ');

      const newCustomCommand = new CustomCommand({
        code,
        response,
        complex,
        tools,
        serverId: server.serverId,
      });

      // Protects against infinite bot spam loop
      if (newCustomCommand.response.startsWith('!')) {
        newCustomCommand.response = response.substring(1);
      }

      return newCustomCommand.save()
        .then(() => {
          message.reply('Command created successfully.');
        });
    })
    .catch(err => {
      console.log(`Error while creating custom command: ${err}`);
      message.reply('Unable to create a custom command at this time, please try again later.');
    });
}
