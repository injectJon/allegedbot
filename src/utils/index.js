import { GUILDS } from '../globals';

export function isGod(context) {
  const { message } = context;
  return (message.senderID === 23807572);  // User ID for Jon = 23807572
}

export function isAdmin( message ) {
  const authorId = message.author.id;
  const admins = GUILDS[ message.guild.id ].admins;

  // Is author the guild owner?
  if ( authorId === message.guild.owner.id ) {
    return true;
  }

  for ( const admin of admins ) {
    if ( authorId === admin ) {
      return true;
    }
  }
}

export function serverUsersList(context) {
  // const { serverId, app } = context;

  // const activeUsers = [];
  // const myServer = app.servers.get(serverId);
  // let slowmode = true;
  // // console.log(myServer);

  // myServer.everyServerMembers((err, user, done) => {
  //   if (err == null && done) {
  //     slowmode = false;
  //     return false;
  //   }
  //
  //   activeUsers.push(user._username);
  //   return true;
  // });

  // if (slowmode === false) {
  //   return activeUsers; // should return an array of username strings
  // }
}
