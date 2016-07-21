import { eightBallMessages } from '../config';

export function eightBallCommand(context) {
  const { message, args } = context;

  const content = args.join(' ');
  if (!content) {
    message.reply('What do you expect me to say back to that? Try harder... ' +
      'https://static-cdn.jtvnw.net/emoticons/v1/67953/1.0'); // quinPalm
    return;
  }

  const roll = Math.floor(Math.random() * eightBallMessages.length);
  message.reply(eightBallMessages[roll]);
}
