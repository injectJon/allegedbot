import { CustomCommand } from '../model';
import { isAdmin } from '../utils';
import { commandTools } from './index';
import { internalEmoteHandler } from '../handlers';

export function addcmdCommand(context) {
  const { message, server, args } = context;

  if (!server) return;

  if (!isAdmin(server, message)) {
    return;
  }

  if (args.length === 0) {
    message.reply('format:  !addcmd <code> <contents>' +
      '\noptions available within contents:  {messagesender}');
    return;
  }

  if (args.length === 1) {
    message.reply('Try harder..');
    return;
  }

  const code = args.shift();
  const regex = /^([a-zA-Z0-9])+$/;
  if (!regex.test(code)) {
    message.reply('The command code is limited to letters and numbers.');
    return;
  }

  CustomCommand.findByCode(server.serverId, code)
    .then(cc => {
      if (cc) {
        message.reply('Custom command already exists.');
        return undefined;
      }

      // Command complexity check
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

      // Internal emote replacement
      const content = args.join(' ');

      internalEmoteHandler(context, content, (response) => {
        const newCustomCommand = new CustomCommand({
          code,
          response,
          complex,
          tools,
          serverId: server.serverId,
        });

        // Save new command
        return newCustomCommand.save()
          .then(() => {
            message.reply('Command created successfully.');
          });
      });
    })
    .catch(err => {
      console.log(`Error while creating custom command: ${err}`);
      message.reply('Unable to create a custom command at this time, please try again later.');
    });
}
