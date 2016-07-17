
export function featureCommand(context) {
  const { message, server, args } = context;

  const options = ['enable', 'disable'];
  const flags = ['emotes', 'bully', '8ball', 'love'];

  if (!server) return;

  if (server.admins.indexOf(message.senderID) < 0) {
    return;
  }

  const option = args.shift().toLowerCase();
  const flag = args.shift().toLowerCase();
  console.log(`option: ${option}, flag: ${flag}`);

  if (!options.includes(option)) {
    message.reply(`Unknown option '${option}'`);
    return;
  }

  if (!flags.includes(flag)) {
    message.reply(`Unknown feature '${flag}'`);
    return;
  }

  if (flag === '8ball') {
    const casualSwitch = 'eightball';
    server[casualSwitch] = (option === 'enable');
  }

  server[flag] = (option === 'enable');

  server.save()
    .then(() => {
      message.reply(`The ${flag} feature has been ${option}d.`);
    })
    .catch(err => {
      console.log(`Unable to save server ${err}`);
      message.reply('Unable to modify features at this time, please try again later.');
    });
}
