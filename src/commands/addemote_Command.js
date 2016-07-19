import { CustomEmote } from '../model';
import { isAdmin } from '../utils';

export function addemoteCommand(context) {
  const { message, server, args } = context;

  if (!server) return;

  if (!isAdmin(server, message)) {
    return;
  }

  if (args.length === 0) {
    message.reply('format:  !addemote <code> <url>');
  }

  if (args.length < 2 && args.length > 0) {
    message.reply('Try harder...');
    return;
  }

  const code = args.shift();
  const url = args.shift();
  if (!url.startsWith('https://cdn.betterttv.net/emote/')) {
    return message.reply('At the moment, we have chosen to only allow for the' +
      '\naddition of emotes from BTTV. Feel free to pass along the names of domains' +
      '\nyou\'d like to see added to the whitelist in the future. :)');
  }

  CustomEmote.findByCode(server.serverId, code)
    .then(ec => {
      if (ec) {
        message.reply('Emote already exists.');
      }

      const newCustomEmote = new CustomEmote({
        code,
        url,
        serverId: server.serverId,
      });

      return newCustomEmote.save()
      .then(() => {
        message.reply(`${code} was added successfully.`);
      });
    })
    .catch(err => {
      console.log(`Error while adding custom emote: ${err}`);
      message.reply('Unable to add a custom emote at this time, please try again later.');
    });
}
