import { registerCommand } from './register_Command';
import { bullyCommand } from './bully_Command';
import { featureCommand } from './feature_Command';
import { addcmdCommand } from './addcmd_Command';
import { delcmdCommand } from './delcmd_Command';
import { editcmdCommand } from './editcmd_Command';

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
];
