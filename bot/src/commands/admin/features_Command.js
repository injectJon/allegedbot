import { isAdmin } from '../../utils';
import { GUILDS } from '../../globals';
import { updateGuildFeatures } from '../../utils/apiRequests';

export function featuresCommand( message ) {

  if ( !isAdmin( message ) ) return;

  const guild = GUILDS[ message.guild.id ];

  const args = message.content.split( /\s+/ ).slice( 1 );

  if ( args.length < 2 ) {
    // reply with current state of features
    message.reply(
      'Enable/disable bot features for your server:' +
      '\n```!features <enable/disable> <bully/8ball/love>```' +
      '\nCurrent feature states:' +
      `\n  bully  :  ${ ( guild.bully ) ? 'enabled' : 'disabled' }` +
      `\n  8ball  :  ${ ( guild.eightball ) ? 'enabled' : 'disabled' }` +
      `\n  love   :  ${ ( guild.love ) ? 'enabled' : 'disabled' }`
    );
    return;
  }

  const options = [ 'enable', 'disable' ];
  const flags = [ 'bully', '8ball', 'love' ];

  const option = args.shift().toLowerCase();
  const flag = args.shift().toLowerCase();

  if ( !options.includes( option ) ) {
    message.reply( `Unknown option '${ option }'` );
    return;
  }

  if ( !flags.includes( flag ) ) {
    message.reply( `Unknown feature '${ flag }'` );
    return;
  }

  const state = ( option === 'enable' );

  if ( flag === '8ball' ) {
    const modifiedFlag = 'eightball';

    updateGuildFeatures( guild, modifiedFlag, state )
      .then( updatedGuild => {
        if ( updatedGuild[ modifiedFlag ] !== state ) {
          message.reply( `Error updating feature state. Try again later.` );
          return;
        }

        GUILDS[ message.guild.id ][ modifiedFlag ] = state;
        message.reply( `Successfully updated feature state.` );
      } );

    return;
  }

  updateGuildFeatures( guild, flag, state )
    .then( updatedGuild => {
      if ( updatedGuild[ flag ] !== state ) {
        message.reply( `Error updating feature state. Try again later.` );
        return;
      }

      GUILDS[ message.guild.id ][ flag ] = state;
      message.reply( `Successfully updated feature state.` );
    } );
}