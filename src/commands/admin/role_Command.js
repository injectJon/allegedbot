import { isGod } from '../../utils';

export function roleCommand(context) {
  const { message, server, args } = context;

  if (!server) return;

  if (!isGod(context)) {
    return;
  }

  if (args.length === 0) {
    message.reply('To check a users role:' +
      '\n```!role check <@user>```' +
      '\nTo give/take admin:' +
      '\n```!role <give/take> admin <@user>```');
    return;
  }

  if (args.length === 1) {
    message.reply('Try harder...');
    return;
  }
  const options = ['give', 'take', 'check'];
  const flags = ['admin'];

  const option = args.shift();  // option = ['give']  (give/take)
  if (!options.includes(option)) {
    message.reply(`Unknown option '${option}'`);
    return;
  }

  const flag = args.shift();  // flag = ['admin']
  if (!flags.includes(flag)) {
    message.reply(`Unknown role '${flag}'`);
    return;
  }

  const userMention = args.shift();  // userMention = ['@12345678:username']

  const user = userMention.split(':', -1).splice(1, 1);  // user = ['emoteBot']

  const userId = userMention.split(':', 1).toString().substring(1);  // userId = ['12345678']

  if (userId === undefined) {
    message.reply('You must mention the user, e.g. ```@username```');
    return;
  }

  if (option === 'check') {
    const index = server.admins.indexOf(userId);

    if (index === -1) {
      message.reply(`User: ${user}\nRole: Member`);
      return;
    }

    message.reply(`User: ${user}\nRole: Admin`);
    return;
  }

  if (flag === 'admin') {
    const index = server.admins.indexOf(userId);

    if (option === 'give') {
      if (index !== -1) {
        message.reply('that user is already an admin');
        return;
      }

      server.admins.push(userId);
    }

    if (index !== -1) {
      server.admins.splice(index, 1);
    }
  }

  server.save()
    .then(() => {
      message.reply(`Successfully updated ${user}'s role.`);
      return;
    })
    .catch(err => {
      console.log(`Error while adding role: ${err}`);
      return message.reply('Unable to update roles at this time, please try again later.');
    });
}
