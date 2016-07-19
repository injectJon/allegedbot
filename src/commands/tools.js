import { recentUserList } from '../cursebot';

export function includeMessageSender(words, message) {
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

export function findRandomUser(words, message) {
  // FIX: BROKEN - SEE 'recentUserList'
  const results = [];
  // let users = [];

  for (let i = 0; i < words.length; i++) {
    // if (words[i] === '{@randomuser}') {
    //   users = recentUserList(message);
    //   console.log(users);

    //   const roll = Math.floor(Math.random() * users.length);
    //   results.push(users[roll]);
    // }

    results.push(words[i]);
  }
  return results;
}
