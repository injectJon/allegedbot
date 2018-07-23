import { internalCommands } from './index';
import { isAdmin } from '../utils';

export function cmdlistCommand(context) {
  const { message, server, args } = context;

  if (!server) return;

  const clist = [];   // server specific custom commands
  const elist = [];  // internal commands for everyone
  const alist = [];  // internal commands for admin

  CustomCommand.find({ serverId: server.serverId })
    .then(cmds => {
      cmds.forEach(cmd => {
        clist.push(cmd.code);
      });
      internalCommands.forEach(icmd => {
        if (icmd.command !== 'register') {
          if (icmd.access === 'admin') {
            alist.push(icmd.command);
          } else {
            elist.push(icmd.command);
          }
        }
      });

      const cresponse = clist.join(', ');
      const eresponse = elist.join(', ');
      const aresponse = alist.join(', ');

      if (args[0] === 'admin' && isAdmin(context)) {
        message.reply(`_*Admin Commands:*_ ${aresponse}`);
        return;
      }

      message.reply(`_*Commands:*_ ${cresponse}, ${eresponse}`);
    });
}
