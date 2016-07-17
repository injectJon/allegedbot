export function bullyCommand(context) {
  const { message, server, args } = context;

  if (!server || !server.bully) {
    console.log('bully disabled for server');
    return;
  }

  if (args.length !== 1) {
    message.reply("I don't know what you want me to do.");
    return;
  }

  const target = args[0];

  const odds = Math.random();
  if (odds >= 0.65) {
    message.reply(`*${message.senderName}* bullied ${target} with ~GREAT~ success!  quinJudy`);
  } else {
    message.reply(`*${message.senderName}* failed to bully ${target} . What a ~PLEB!~  alkXD`);
  }
}
