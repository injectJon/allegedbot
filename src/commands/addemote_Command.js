import { CustomEmote } from '../model';

export function addemoteCommand(context) {
  const { message, server, args } = context;

  if (!server) return;

  if (server.admins.indexOf(message.senderID) < 0) {
    return;
  }

  if (args.length < 2) {
    message.reply('Try harder...');
    return;
  }

  const code = args.shift();
  const url = args.shift();

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
