import { CustomCommand } from '../model';

export function delcmdCommand(context) {
  const { message, server, args } = context;

  if (args.length < 1) {
    message.reply(`Unknown command '${args[0]}'`);
    return;
  }

  const code = args.shift();

  CustomCommand.findOneAndRemove({ serverId: server.serverId, code }, (error, cc) => {
    if (error) {
      return message.reply('Unable to delete command at this time, please try again later.');
    }

    if (!cc) {
      return message.reply(`The custom command '${code}' doesn't exist.`);
    }

    return cc.save()
      .then(() => {
        message.reply(`Command '${code}' has been deleted successfully.`);
      })
      .catch(err => {
        console.log(`Error deleting custom command: ${err}`);
        message.reply('Unable to delete command at this time, please try again later.');
      });
  });
}
