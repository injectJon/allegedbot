import { CustomEmote } from '../model';

export function emotelistCommand(context) {
  const { message, server } = context;

  if (!server) return;

  const list = [];

  CustomEmote.find({ serverId: server.serverId })
    .then(emotes => {
      emotes.forEach(emote => {
        list.push(` ${emote.code} (${emote.code})`);
      });

      const response = list.join(', ');
      message.reply(`_*Custom Emotes:*_ ${response}`);
    });
}