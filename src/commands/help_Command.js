
export function helpCommand(context) {
  const { message, server } = context;

  if (!server) return;

  message.reply(
    'Type "!cmdlist" to see a list of the available commands.' +
    '\nAdmin can type "!cmdlist admin" to see a list of admin commands.' +
    '\n\nIf you would like to know how any particular command functions, ' +
    'send only the code and it will return information about its use.'
  );
  return;
}
