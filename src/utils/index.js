
export function isGod(message) {
  return (message.senderID === '23807572');  // User ID for Jon = '23807572'
}

export function isAdmin(server, message) {
  return (isGod(message.senderID) || server.admins.indexOf(message.senderID) !== -1);
}
