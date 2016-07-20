// import { serverUsersList } from '../utils';

export function includeMessageSender(words, context) {
  const { message } = context;
  const results = [];

  for (let i = 0; i < words.length; i++) {
    if (words[i] === '{messagesender}') {
      results.push(message.senderName);
    } else {
      results.push(words[i]);
    }
  }

  return results;
}

export function findRandomUser(words, context) {
  // const { serverId, app } = context;

  // const results = [];
  // const users = [];

  // words.forEach(word => {
  //   if (word !== '{@randomuser}') {
  //     results.push(word);
  //   } else {
  //     const myServer = app.servers.get(serverId);
  //     let slowmode = true;

  //     myServer.everyServerMembers((err, user, done) => {
  //       if (!err) {
  //         if (done) {
  //           slowmode = false;
  //           return false;
  //         }

  //         users.push(user._username);
  //         return true;
  //       }
  //     });

  //     if (!slowmode) {
  //       console.log(users.length);
  //       const roll = Math.floor(Math.random() * users.length);
  //       results.push(users[roll]);
  //     }
  //   }
  // });

  // return results;
}
