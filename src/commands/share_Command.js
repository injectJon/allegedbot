export function shareCommand( message ) {
  message.reply( `Follow this link to bring the bot to any server you manage: <${ process.env.DISCORD_BOT_INVITE_URL }>` );
  return;
}
