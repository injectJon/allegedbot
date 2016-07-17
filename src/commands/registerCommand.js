import { Server } from '../model';

export function registerCommand(context) {
  if (context.server) {
    // Server is already registered, show some kind of error message.
    context.message.reply('This server has already been registered.');
    return;
  }

  const newServer = new Server({
    serverId: context.serverId,
    admins: [context.message.senderID],
  });

  newServer.save()
    .then(() => {
      context.message.reply('Success! Your server has been registered.');
    })
    .catch(err => {
      console.log(`Unable to save new server ${err}`);
      context.message.reply('Unable to register your server at this time, please try again later.');
    });
}
