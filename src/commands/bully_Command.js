
export function bullyCommand(context) {
  const { message, server, args } = context;

  if (!server || !server.bully) {
    console.log('bully disabled for server');
    return;
  }

  if (args.length < 1) {
    message.reply(`*I, your bot overlord,* have bullied ${message.senderName} ` +
      'with ~GREAT~ success! https://static-cdn.jtvnw.net/emoticons/v1/68036/1.0' + // quinJudy
      '\n\nProper formatting: ```!bully <anything>```');
    return;
  }

  const target = args.join(' ');

  const odds = Math.random();
  if (odds >= 0.65) {
    message.reply(`*${message.senderName}* bullied ${target} with ~GREAT~ success! ` +
      'https://static-cdn.jtvnw.net/emoticons/v1/68036/1.0'); // quinJudy
  } else {
    message.reply(`*${message.senderName}* failed to bully ${target} . What a ~PLEB!~ ` +
      'https://static-cdn.jtvnw.net/emoticons/v1/102146/1.0');  // alkXD
  }
}
