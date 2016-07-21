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
  let removed;
  let counter = 0;
  args.forEach(code => {
    CustomCommand.findOneAndRemove({ serverId: server.serverId, code })
      .then(cc => {
        if (cc) {
          counter++;
        } else {
          message.reply(`The command '${code}' doesn't exist.`);
          return;
        }

        if (args.length === 1) {
          message.reply(`The command '${code}' was successfully deleted.`);
          return;
        }

        if (counter === args.length) {
          removed = args.join("', '");
          message.reply(`The commands '${removed}' were successfully deleted.`);
          return;
        }
      })
      .catch(err => {
        console.log(`Unable to delete custom command ${err}`);
        message.reply('Unable to delete command at this time, please try again later.');
      });
  });
}
