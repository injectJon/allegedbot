import { eightBallMessages } from '../config';

export function eightBallCommand( message ) {
  const content = message.content.split(/\s+/).slice(1).join( ' ' );

  if ( !content ) return;

  const roll = Math.floor( Math.random() * eightBallMessages.length );

  message.channel.send( eightBallMessages[ roll ] );
}
