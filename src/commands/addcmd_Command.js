import { CustomCommand } from '../model';

export function addcmdCommand(context) {
  const { message, server, args } = context;

  if (!server) return;

  if (server.admins.indexOf(message.senderID) < 0) {
    return;
  }

  if (args.length < 2) {
    message.reply('Try harder..');
    return;
  }

  const code = args.shift();
  const response = args.join(' ');

  CustomCommand.findByCode(server.serverId, code)
    .then(cc => {
      if (cc) {
        message.reply('Custom command already exists.');
        return undefined;
      }

      const newCustomCommand = new CustomCommand({
        code,
        response,
        serverId: server.serverId,
      });

      return newCustomCommand.save()
        .then(() => {
          message.reply('Command created successfully.');
        });
    })
    .catch(err => {
      console.log(`Error while creating custom command: ${err}`);
      message.reply('Unable to create a custom command at this time, please try again later.');
    });
}
