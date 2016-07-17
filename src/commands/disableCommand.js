import { Server } from '../model';

const flags = ['emotes', 'bully'];

export function disableCommand(context) {
  const { message, server, args } = context;

  if (!server) {
    message.reply('This server is not registered.');
    return;
  }

  const flag = args[0];

  if (flags.includes(flag)) {
    server[flag] = false;
    server.save()
      .then(() => {
        message.reply(`${flag} is now disabled.`);
      })
      .catch(err => {
        console.log(`Unable to save server ${err}`);
        message.reply('Unable to modify features at this time, please try again later.');
      });
  } else {
    message.reply(`Unknown feature '${flag}'`);
  }
}
