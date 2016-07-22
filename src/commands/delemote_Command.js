import { CustomEmote } from '../model';
import { isAdmin } from '../utils';

export function delemoteCommand(context) {
  const { message, server, args } = context;

  if (!server) return;

  if (!isAdmin(context)) {
    return;
  }

  if (args.length === 0) {
    message.reply('Delete a user added emote: ```!delemote <code>```' +
    '\nMultiple emotes may be deleted at the same time.');
  }

  if (!args.length === 2 && !args.length === 0) {
    message.reply(`Emote '${args[0]}' does not exist.`);
    return;
  }
  const code = args.shift();

  CustomEmote.findOneAndRemove({ serverId: server.serverId, code })
    .then(cc => {
      if (cc) {
        message.reply(`The custom emote '${code}' was successfully removed.'`);
      } else {
        message.reply(`The custom emote '${code}' doesn't exist.`);
      }
    })
    .catch(err => {
      console.log(`Unable to delete custom emote ${err}`);
      message.reply('Unable to delete emote at this time, please try again later.');
    });
}
