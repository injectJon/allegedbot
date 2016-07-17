import { Server } from '../model';

const options = ['enable', 'disable'];
const flags = ['emotes', 'bully'];

export function featureCommand(context) {
  const { message, server, args } = context;

  if (!server) {
    message.reply('This server is not registered.');
    return;
  }

  const option = args[0];
  const flag = args[1];

  if (!options.includes(option)) {
    message.reply(`Unknown option '${option}'`);
    return;
  }

  if (!flags.includes(flag)) {
    message.reply(`Unknown feature '${flag}'`);
    return;
  }

  if (option === 'enabled') {
    server[flag] = true;
  } else {
    server[flag] = false;
  }

  server.save()
    .then(() => {
      message.reply(`${flag} is now ${option}d.`);
    })
    .catch(err => {
      console.log(`Unable to save server ${err}`);
      message.reply('Unable to modify features at this time, please try again later.');
    });
}
