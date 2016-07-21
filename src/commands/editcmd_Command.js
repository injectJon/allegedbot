import { CustomCommand } from '../model';
import { isAdmin } from '../utils';
import { commandTools } from './index';
import { internalEmoteHandler } from '../handlers';


export function editcmdCommand(context) {
  const { message, server, args } = context;

  if (!server) return;

  if (!isAdmin(server, message)) {
    return;
  }

  if (args.length === 0) {
    message.reply('format:  !editcmd <code> <edited contents>' +
    '\noptions available within contents:  {messagesender}');
  }

  if (args.length < 2 && args.length > 0) {
    message.reply('No edited content was found.');
    return;
  }

  const code = args.shift();

  CustomCommand.findByCode(server.serverId, code)
    .then(cc => {
      if (!cc) {
        return message.reply(`The custom command '${code}' doesn't exist.`);
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

      cc.complex = complex;

      if (complex === true) {
        cc.tools = tools;
      }

      // Internal emote replacement
      const content = args.join(' ');

      internalEmoteHandler(context, content, (response) => {
        cc.response = response;
      });

      // Save edited command
      return cc.save()
        .then(() => {
          message.reply('The command was updated successfully');
        });
    })
    .catch(err => {
      console.log(`Error while creating custom command: ${err}`);
      message.reply('Unable to create a custom command at this time, please try again later.');
    });
}
