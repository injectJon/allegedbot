import { bullyCommand } from './bully_Command';
import { eightBallCommand } from './8ball_Command';
import { loveCommand } from './love_Command';
import { emotelistCommand } from './emotelist_Command';
import { cmdlistCommand } from './cmdlist_Command';
import { helpCommand } from './help_Command';
import { featuresCommand } from './features_Command';
import { addcmdCommand } from './addcmd_Command';
import { delcmdCommand } from './delcmd_Command';
import { editcmdCommand } from './editcmd_Command';
import { addemoteCommand } from './addemote_Command';
import { delemoteCommand } from './delemote_Command';
import { roleCommand } from './role_Command';
import { registerCommand } from './register_Command';

import { findRandomUser, includeMessageSender } from './tools';

export const internalCommands = [
  {
    command: 'bully',
    handler: bullyCommand,
    access: 'everyone',
  },
  {
    command: '8ball',
    handler: eightBallCommand,
    access: 'everyone',
  },
  {
    command: 'love',
    handler: loveCommand,
    access: 'everyone',
  },
  {
    command: 'emotelist',
    handler: emotelistCommand,
    access: 'everyone',
  },
  {
    command: 'cmdlist',
    handler: cmdlistCommand,
    access: 'everyone',
  },
  {
    command: 'help',
    handler: helpCommand,
    access: 'everyone',
  },
  {
    command: 'features',
    handler: featuresCommand,
    access: 'admin',
  },
  {
    command: 'addcmd',
    handler: addcmdCommand,
    access: 'admin',
  },
  {
    command: 'delcmd',
    handler: delcmdCommand,
    access: 'admin',
  },
  {
    command: 'editcmd',
    handler: editcmdCommand,
    access: 'admin',
  },
  {
    command: 'addemote',
    handler: addemoteCommand,
    access: 'admin',
  },
  {
    command: 'delemote',
    handler: delemoteCommand,
    access: 'admin',
  },
  {
    command: 'role',
    handler: roleCommand,
    access: 'admin',
  },
  {
    command: 'register',
    handler: registerCommand,
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
