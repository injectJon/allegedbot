import { GUILDS } from '../globals';

export function isAdmin( message ) {
  const adminRoleName = 'AllegedBot Admin';
  const modRoleNames = 'moderator mod admin administrator '
  const authorRoles = message.member.roles.array();
  const adminRole = authorRoles.filter( role => role.name === adminRoleName || modRoleNames.includes( role.name ) );

  return (adminRole.length >= 1 ) ? true : false;
}
