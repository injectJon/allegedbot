import { internalCommands } from './commands';
import { CustomCommand } from './model';

// const commands = [
//   {
//     label: 'love',
//     enabled: svr => svr.love,
//     action: (msg) => {
//       const content = msg.content.replace('!love ', '');
//       const odds = Math.round(100 * Math.random());

//       msg.reply(`There's ${odds}% bleedPurple between ${content} and ${msg.senderName}`);
//     },
//   },
//   {
//     label: '8ball',
//     enabled: svr => svr.eightball,
//     action: (msg) => {
//       const roll = Math.floor(Math.random() * eightBallMessages.length);
//       msg.reply(eightBallMessages[roll]);
//     },
//   },
//   {


export function emoteHandler(context) {
  const { message, emotes, server } = context;

  if (!server || !server.emotes) {
    console.log('Emotes disabled for server');
    return;
  }

  let spamCheck = 0;
  const content = message.content.replace(/(?!\s+)\S+/g, match => {
    console.log(`Match: ${match}`);
    if (emotes[match]) {
      spamCheck += 1;
      return emotes[match].url;
    }

    return match;
  });

  console.log(content);

  // If message has been modified
  if (content !== message.content) {
    if (spamCheck <= 100) {
      message.editContent(content);
    } else {
      // They know what they did wrong.
      message.deleteMessage();
    }
  }
}

export function commandHandler(context) {
  const { message, server } = context;

  if (!message.content.startsWith('!')) {
    console.log('Message is not a command, abort.');
    return;
  }

  const parts = message.content.substring(1).split(/\s+/);
  const commandStr = parts[0].toLowerCase();

  context.args = parts;
  context.command = context.args.shift();

  // check for internal commands
  const commandDef = internalCommands.find(cmd => cmd.command === commandStr);
  if (commandDef) {
    commandDef.handler(context);
    return;
  }

  if (server) {
    CustomCommand.findByCode(server.serverId, commandStr)
      .then(customCommand => {
        if (customCommand) {
          message.reply(customCommand.message);
        }
      })
      .catch(err => {
        console.log(`Error while looking up custom commands ${err}`);
      });
  }
}

