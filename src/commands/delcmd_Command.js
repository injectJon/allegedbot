import { CustomCommand } from '../model';
import { isAdmin } from '../utils';

export function delcmdCommand(context) {
  const { message, server, args } = context;

  if (!server) return;

  if (!isAdmin(server, message)) {
    return;
  }

  if (args.length === 0) {
    message.reply('format:  !delcmd <code>');
  }

  if (args.length > 1) {
    message.reply(`Unknown command '${args[0]}'`);
    return;
  }

  const code = args.shift();

  CustomCommand.findOneAndRemove({ serverId: server.serverId, code })
    .then(cc => {
      if (cc) {
        message.reply(`The custom command '${code}' was successfully removed.`);
      } else {
        message.reply(`The custom command '${code}' doesn't exist.`);
      }
    })
    .catch(err => {
      console.log(`Unable to delete custom command ${err}`);
      message.reply('Unable to delete command at this time, please try again later.');
    });
}
