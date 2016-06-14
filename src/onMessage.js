import _ from 'lodash';

import { eightBallMessages } from './config';
import { Servers } from './models/Server';
import { Commands } from './models/Command';

function checkDBcmd(msg, db, server) {

  const cmd = msg.content.split(' ')[2];
  Commands.find({ svr: server.id, code: cmd }, 'message', (err, command) => {
    if (err) return console.log(err);

    return msg.reply(command.message);
  });
}

export function emoteReplace(message, db, server, emotes, blackList) {

  if (server.emotes) {
    let spamCheck = 0;
    const content = message.content.replace(/(?!\s+)\S+/g, (match) => {
      if (match.length <= 4) {         // Ignore matches with 4 or less characters
        return match;
      }
      if (blackList[match]) {         // Ignore blacklisted emotes
        return match;
      }
      if (match === 'N1neXD') {
        return 'https://cdn.betterttv.net/emote/5756e1d5318862cb5fb1b95f/1x';
        spamCheck += 1;
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
}

export function cmdFunction(message, db, server) {
  const commands = [
    {
      label: 'cmdlist',
      enabled: svr => svr.cmdSupport,
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
    { // format: >> !addcmd <access> <code> <action: takes rest of msg as is>
      label: 'addcmd',
      enabled: svr => svr.addcmd,
      action: (msg, server) => {

        const msgSplit = msg.content.split(' ', 3);

        const commandDB = new Commands({
          serverId: server._id,
          code: msgSplit[2],
          access: msgSplit[1],
          createdBy: msg.senderName,

          message: msgSplit[3],  // simple response, just slices msg after code
        });

        cmdDB.save((err) => {
          if (err) {
            return console.log(err);
          }
          else {
            console.log(`${commandDB.code} was added to DB by ${commandDB.createdBy}`);
            console.log(`    ${commandDB}`);
            msg.reply(`*${commandDB.code}* was added to the database.`);
          }
        });
      },
    },
  ];

  _.each(commands, cmd => {  //
    let next = true;

    if (cmd.enabled(server)) {
      if (message.content.startsWith(`!${cmd.label}`)) {
        cmd.action(message, server);
        next = false;
      }
    }

    return next;
  });
}
