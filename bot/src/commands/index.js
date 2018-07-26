import { bullyCommand } from './bully_Command';
import { eightBallCommand } from './8ball_Command';
import { loveCommand } from './love_Command';
import { cmdlistCommand } from './cmdlist_Command';
import { featuresCommand } from './admin/features_Command';
import { addcmdCommand } from './admin/addcmd_Command';
import { delcmdCommand } from './admin/delcmd_Command';
import { editcmdCommand } from './admin/editcmd_Command';
import { shareCommand } from './share_Command';

import { findRandomUser, includeMessageSender } from './tools';

export const internalCommands = [
  {
    command: '!bully',
    handler: bullyCommand,
    access: 'everyone',
  },
  {
    command: '!8ball',
    handler: eightBallCommand,
    access: 'everyone',
  },
  {
    command: '!love',
    handler: loveCommand,
    access: 'everyone',
  },
  {
    command: '!cmdlist',
    handler: cmdlistCommand,
    access: 'everyone',
  },
  {
    command: '!features',
    handler: featuresCommand,
    access: 'admin',
  },
  {
    command: '!addcmd',
    handler: addcmdCommand,
    access: 'admin',
  },
  {
    command: '!delcmd',
    handler: delcmdCommand,
    access: 'admin',
  },
  {
    command: '!editcmd',
    handler: editcmdCommand,
    access: 'admin',
  },
  {
    command: '!share',
    handler: shareCommand,
    access: 'everyone',
  }
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
