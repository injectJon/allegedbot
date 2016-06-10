import _ from 'lodash';

import { eightBallMessages } from './config';

const commands = [
  {
    label: 'cmdlist',
    enabled: svr => svr.cmd,
    action: (msg) => {
      msg.reply('_Commands:_ *!8ball , !bully , !love* \n_Emotes:_ Currently supporting all *Twitch Global/Subscriber* & *BTTV* emotes');
    },
  },
  {
    label: 'bully',
    enabled: svr => svr.bully,
    action: (msg) => {
      const content = msg.content.replace('!bully ', '');
      const odds = Math.random();
      if (odds >= 0.65) {
        msg.reply(`*${msg.senderName}* bullied ${content} with ~GREAT~ success!  quinJudy`);
      } else {
        msg.reply(`*${msg.senderName}* failed to bully ${content} . What a ~PLEB!~  alkXD`);
      }
    },
  },
  {
    label: 'love',
    enabled: svr => svr.love,
    action: (msg) => {
      const content = msg.content.replace('!love ', '');
      const odds = Math.round(100 * Math.random());

      msg.reply(`There's ${odds}% bleedPurple between ${content} and ${msg.senderName}`);
    },
  },
  {
    label: '8ball',
    enabled: svr => svr.eightball,
    action: (msg) => {
      const roll = Math.floor(Math.random() * eightBallMessages.length);
      msg.reply(eightBallMessages[roll]);
    },
  },
];

export function onMessage(message, server, emotes, blackList) {
  // Emote Replacement

  if (server.emote) {
    let spamCheck = 0;
    const content = message.content.replace(/(?!\s+)\S+/g, (match) => {
      if (match.length <= 4) {         // Ignore matches with 4 or less characters
        return match;
      }
      if (blackList[match]) {         // Ignore blacklisted emotes
        return match;
      }

      if (emotes[match]) {	// Check for match in emote list
        spamCheck += 1;
        return emotes[match].url;
      }

      return match;
    });

    if (content !== message.content) {      // Actual send message function
      if (spamCheck <= 15) {		// Emote spam check
        message.editContent(content);
        console.log(`    Replaced emote(s) for: { ${message.senderName}: ${message.senderID} }`);
        spamCheck = 0;
      } else {		// What to do with spam
        message.deleteMessage();
        message.reply('_*Message deleted:*_  *the message contained more than 15 emotes.*');
        console.log(`Deleted ${message.senderName}\'s message. It contained ${spamCheck} emotes.`);
        spamCheck = 0;
      }
    } else {
      spamCheck = 0;		// Reset the spam checker
    }
  }

  _.each(commands, cmd => {
    let next = true;

    if (cmd.enabled(server)) {
      if (message.content.startsWith(`!${cmd.label}`)) {
        cmd.action(message);
        next = false;
      }
    }

    return next;
  });
}
