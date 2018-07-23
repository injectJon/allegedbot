// import { serverUsersList } from '../utils';

// replaces {messagesender} with the senders tag
export function includeMessageSender(message, commandResponse) {
  console.log( 'here' )
  const parts = commandResponse.split( ' ' );

  parts.forEach( ( arg, i ) => {
    if ( arg === '{messagesender}' ) {
      parts[ i ] = `<@${ message.author.id }>`;
    }
  } );

  return parts.join( ' ' );
}

// replaces {@randomuser} with a random server channel member tag
export function findRandomUser( message, commandResponse ) {
  const parts = commandResponse.split( ' ' );

  parts.forEach( ( arg, i ) => {
    if ( arg === '{@randomuser}' ) {
      const members = message.channel.members.array();
      parts[ i ] = `<@${ members[ Math.floor( Math.random() * members.length ) ].id }>`;
    }
  } );

  return parts.join( ' ' );
}
