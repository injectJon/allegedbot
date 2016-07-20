
export function loveCommand(context) {
  const { message, server, args } = context;

  if (!server || !server.love) {
    console.log('love command disabled for server');
    return;
  }

  const content = args.join(' ');

  if (!content) {
    message.reply(`There's 0% bleedPurple between Proper Cmd Formatting and ${message.senderName}.`);
    return;
  }

  const odds = Math.round(100 * Math.random());
  message.reply(`There's ${odds}% bleedPurple between ${content} and ${message.senderName}.`);
}
