import { isAdmin } from '../../utils';

export function featuresCommand(context) {
  const { message, server, args } = context;

  if (!server) return;

  if (!isAdmin(context)) {
    return;
  }

  if (args.length === 0) {
    message.reply('Enable/disable bot features for your server:' +
    '\n```!feature <enable/disable> <emotes/bully/8ball/love>```' +
    '\nMultiple features may be adjusted at one time');
  }

  const options = ['enable', 'disable'];
  const flags = ['emotes', 'bully', '8ball', 'love'];

  const option = args.shift().toLowerCase();

  if (!options.includes(option)) {
    message.reply(`Unknown option '${option}'`);
    return;
  }

  args.forEach(flag => {
    if (!flags.includes(flag)) {
      message.reply(`Unknown feature '${flag}'`);
      return;
    }

    if (flag === '8ball') {
      const casualSwitch = 'eightball';
      server[casualSwitch] = (option === 'enable');
    }

    server[flag] = (option === 'enable');
  });

  server.save()
    .then(() => {
      message.reply(`The feature(s) have been ${option}d.`);
      return;
    })
    .catch(err => {
      console.log(`Unable to save server ${err}`);
      return message.reply('Unable to modify features at this time, please try again later.');
    });
}