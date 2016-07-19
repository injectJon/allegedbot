import { CustomCommand } from '../model';
import { internalCommands } from './index';

export function cmdlistCommand(context) {
  const { message, server } = context;

  if (!server) return;

  const clist = [];
  const ilist = [];

  CustomCommand.find({ serverId: server.serverId })
    .then(cmds => {
      cmds.forEach(cmd => {
        clist.push(cmd.code);
      });
      internalCommands.forEach(icmd => {
        if (icmd.command !== 'register') {
          ilist.push(icmd.command);
        }
      });
      const cresponse = clist.join(', ');
      const iresponse = ilist.join(', ');
      message.reply(`_*Custom Commands:*_ ${cresponse}` +
        `\n_*Internal Commands:*_ ${iresponse}`);
    });
}
