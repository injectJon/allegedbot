export function bullyCommand(context) {
  const { message, server, args } = context;

  if (!server || !server.bully) {
    console.log('bully disabled for server');
    return;
  }

  if (args.length < 1) {
    message.reply(`*I, your bot overlord,* have bullied ${message.senderName} with ~GREAT~ success! quinJudy`);
    return;
  }

  const target = args.join(' ');

  const odds = Math.random();
  if (odds >= 0.65) {
    message.reply(`*${message.senderName}* bullied ${target} with ~GREAT~ success!  quinJudy`);
  } else {
    message.reply(`*${message.senderName}* failed to bully ${target} . What a ~PLEB!~  alkXD`);
  }
}
