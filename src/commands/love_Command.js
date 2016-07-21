
export function loveCommand(context) {
  const { message, server, args } = context;

  if (!server || !server.love) {
    console.log('love command disabled for server');
    return;
  }

  const content = args.join(' ');

  if (!content) {
    message.reply(`${message.senderName}, love test formatting: !love <anything>`);
    return;
  }

  const odds = Math.round(100 * Math.random());
  message.reply(`There's ${odds}% https://static-cdn.jtvnw.net/emoticons/v1/62835/1.0 ` +
    `between ${content} and ${message.senderName}.`);
}
