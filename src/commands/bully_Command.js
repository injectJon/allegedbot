import { GUILDS } from '../globals';

export function bullyCommand( message ) {
  const guild = GUILDS[ message.guild.id ];

  if ( !guild || !guild.bully ) return;

  const content = message.content.split(/\s+/).slice(1).join( ' ' );

  if ( !content ) {
    message.channel.send(
      `*I, your bot overlord,* have bullied ${ message.member.nickname || message.author.username } ` +
      'with GREAT success! :smiling_imp: ' +
      '\n\nProper formatting: ```!bully <anything>```'
    );

    return;
  }

  const odds = Math.random();
  if ( odds >= 0.65 ) {
    message.channel.send( `*${ message.member.nickname || message.author.username }* bullied ${ content } with GREAT success! :smiling_imp:` );
  } else {
    message.channel.send( `*${ message.member.nickname || message.author.username }* failed to bully ${ content } . What a PLEB! :rofl:` );
  }
}
