import { GUILDS } from '../globals';

export function isGod(context) {
  const { message } = context;
  return (message.senderID === 23807572);  // User ID for Jon = 23807572
}

export function isAdmin( message ) {
  const adminRoleName = 'AllegedBot Admin';
  const authorRoles = message.member.roles.array();
  const adminRole = authorRoles.filter( role => role.name === adminRoleName );

  console.log( adminRole )

  return (adminRole.length === 1 ) ? true : false;
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
