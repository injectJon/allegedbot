import { GUILDS } from '../globals';

export function loveCommand( message ) {
  const guild = GUILDS[ message.guild.id ];

  if ( !guild || !guild.love ) return;

  const content = message.content.split(/\s+/).slice(1).join( ' ' );

  if ( !content ) return;

  const odds = Math.round( 100 * Math.random() );

  message.channel.send( `There's ${ odds }% :purple_heart: between ${ content } and ${ message.member.nickname || message.author.username }` );
}
