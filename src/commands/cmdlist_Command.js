import { internalCommands } from './index';
import { isAdmin } from '../utils';
import PastebinAPI from 'pastebin-js';
import { GUILDS } from '../globals';

const pastebin = new PastebinAPI( process.env.PASTEBIN_API_KEY );

const createPaste = function createPaste( message ) {
  return new Promise( ( resolve, reject ) => {
    const rawCommands = GUILDS[ message.guild.id ].commands;

    const staticCommands = internalCommands.map( cmd => `${ cmd.command }\n` );
    const customCommands = rawCommands.map( cmd => `${ cmd.code }  :  ${ cmd.response }\n` );

    const commandList = staticCommands.concat( customCommands );

    pastebin
      .createPaste( commandList.join( '' ), `${ message.guild.name } Command List`, 'text', 3, '1M')
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
