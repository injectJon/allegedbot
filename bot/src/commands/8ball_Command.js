import { eightBallMessages } from '../config';
import { GUILDS } from '../globals';

export function eightBallCommand( message ) {
  const guild = GUILDS[ message.guild.id ];

  if ( !guild || !guild.eightball ) return;

  const content = message.content.split(/\s+/).slice(1).join( ' ' );

  if ( !content ) return;

  const roll = Math.floor( Math.random() * eightBallMessages.length );

  message.channel.send( eightBallMessages[ roll ] );
}
