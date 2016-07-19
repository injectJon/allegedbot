import { Server } from '../model';
import { isGod } from '../utils';

export function registerCommand(context) {
  const { message, server, serverId } = context;

  if (!isGod(message)) {
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
