
export function isGod(message) {
  return (message.senderID === 23807572);  // User ID for Jon = 23807572
}

export function isAdmin(server, message) {
  return (isGod(message) || server.admins.indexOf(message.senderID) !== -1);
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

  //   activeUsers.push(user._username);
  //   return true;
  // });

  // if (slowmode === false) {
  //   return activeUsers; // should return an array of username strings
  // }
}
