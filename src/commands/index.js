import { registerCommand } from './registerCommand';
import { bullyCommand } from './bullyCommand';
import { enableCommand } from './enableCommand';
import { disableCommand } from './disableCommand';
import { addcmdCommand } from './addcmdCommand';

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
    command: 'enable',
    handler: enableCommand,
  },
  {
    command: 'disable',
    handler: disableCommand,
  },
  {
    command: 'addcmd',
    handler: addcmdCommand,
  },
];
