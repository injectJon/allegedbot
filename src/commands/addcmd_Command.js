import { CustomCommand } from '../model';

export function addcmdCommand(context) {
  const { message, server, args } = context;

  if (args.length === 0) {
    message.reply('do something here');
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
