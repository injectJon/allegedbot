import { eightBallMessages } from '../config';

export function eightBallCommand(context) {
  const { message, args } = context;

  const content = args.join(' ');
  if (!content) {
    message.reply('What do you expect me to say back to that? Try harder... quinPalm ');
    return;
  }

  const roll = Math.floor(Math.random() * eightBallMessages.length);
  message.reply(eightBallMessages[roll]);
}
