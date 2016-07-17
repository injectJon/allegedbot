
export function loveCommand(context) {
  const { message, args } = context;

  const content = args.join(' ');

  if (!content) {
    message.reply(`There's 0% bleedPurple between Proper Cmd Formatting and ${message.senderName}.`);
    return;
  }

  const odds = Math.round(100 * Math.random());
  message.reply(`There's ${odds}% bleedPurple between ${content} and ${message.senderName}.`);
}
