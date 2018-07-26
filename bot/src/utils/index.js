import { GUILDS } from '../globals';

export function isGod(context) {
  const { message } = context;
  return (message.senderID === 23807572);  // User ID for Jon = 23807572
}

export function isAdmin( message ) {
  const adminRoleName = 'AllegedBot Admin';
  const authorRoles = message.member.roles.array();
  const adminRole = authorRoles.filter( role => role.name === adminRoleName );

  return (adminRole.length === 1 ) ? true : false;
}
