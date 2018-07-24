import { internalCommands } from './index';
import { isAdmin } from '../utils';
import PastebinAPI from 'pastebin-js';
import { GUILDS } from '../globals';


const pastebin = new PastebinAPI( {
  'api_dev_key': process.env.PASTEBIN_API_KEY,
  'api_user_name': process.env.PASTEBIN_USERNAME,
  'api_user_password': process.env.PASTEBIN_PASSWORD,
} );

const createPaste = function createPaste( message ) {
  return new Promise( ( resolve, reject ) => {
    const rawCommands = GUILDS[ message.guild.id ].commands;

    const staticCommands = internalCommands.map( cmd => `${ cmd.command }\n` );
    const customCommands = rawCommands.map( cmd => `${ cmd.code }  ${ cmd.response }\n` );

    const commandList = staticCommands.concat( customCommands );

    pastebin
      .createPaste( commandList.join( '' ), 'Command List', 0, '1M')
      .then( pasteUrl => resolve( pasteUrl ) )
      .fail( err => {
        console.log( err );
        reject();
      } );
  } );
}

export function cmdlistCommand( message ) {

  createPaste( message )
    .then( pasteUrl => {
      message.reply( `The updated command list can be found here: ${ pasteUrl }` );
    } );
}
