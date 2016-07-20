import { registerCommand } from './register_Command';
import { bullyCommand } from './bully_Command';
import { eightBallCommand } from './8ball_Command';
import { loveCommand } from './love_Command';
import { featureCommand } from './feature_Command';
import { addcmdCommand } from './addcmd_Command';
import { delcmdCommand } from './delcmd_Command';
import { editcmdCommand } from './editcmd_Command';
import { addemoteCommand } from './addemote_Command';
import { delemoteCommand } from './delemote_Command';
import { cmdlistCommand } from './cmdlist_Command';
import { emotelistCommand } from './emotelist_Command';
import { roleCommand } from './role_Command';

import { findRandomUser, includeMessageSender } from './tools';

export const internalCommands = [
  {
    command: 'register',
    handler: registerCommand,
  },
  {
    command: 'bully',
    handler: bullyCommand,
  },
  {
    command: '8ball',
    handler: eightBallCommand,
  },
  {
    command: 'love',
    handler: loveCommand,
  },
  {
    command: 'feature',
    handler: featureCommand,
  },
  {
    command: 'addcmd',
    handler: addcmdCommand,
  },
  {
    command: 'delcmd',
    handler: delcmdCommand,
  },
  {
    command: 'editcmd',
    handler: editcmdCommand,
  },
  {
    command: 'addemote',
    handler: addemoteCommand,
  },
  {
    command: 'delemote',
    handler: delemoteCommand,
  },
  {
    command: 'cmdlist',
    handler: cmdlistCommand,
  },
  {
    command: 'emotelist',
    handler: emotelistCommand,
  },
  {
    command: 'role',
    handler: roleCommand,
  },
];

export const commandTools = [
  {
    code: '{@randomuser}',
    handler: findRandomUser,
  },
  {
    code: '{messagesender}',
    handler: includeMessageSender,
  },
];
