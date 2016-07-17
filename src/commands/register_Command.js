import { Server } from '../model';

export function registerCommand(context) {
  const { message, server, serverId } = context;

  const isGod = '23807572';
  if (!message.senderID === isGod) {
    return;
  }

  if (server) {
    // Server is already registered, show some kind of error message.
    message.reply('This server has already been registered.');
    return;
  }

  const newServer = new Server({
    serverId,
    admins: [message.senderID],
  });

  newServer.save()
    .then(() => {
      message.reply('Success! Your server has been registered.');
    })
    .catch(err => {
      console.log(`Unable to save new server ${err}`);
      message.reply('Unable to register your server at this time, please try again later.');
    });
}
