import { CustomCommand } from '../model';
import { isAdmin } from '../utils';

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
  const response = args.join(' ');

  CustomCommand.findByCode(server.serverId, code)
    .then(cc => {
      if (!cc) {
        return message.reply(`The custom command '${code}' doesn't exist.`);
      }

      cc.response = response;

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
