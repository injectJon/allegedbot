import { CustomEmote } from '../model';

function lookupInternalEmotes(words, emotes) {
  return new Promise(resolve => {
    const results = [];

    words.forEach(word => {
      if (emotes[word]) {
        results.push(emotes[word]);
      }
    });

    resolve(results);
  });
}

function lookupServerEmotes(words, server) {
  return CustomEmote.findAllByCode(server.serverId, words);
}

function editErrorHandler(message, content) {
  setTimeout(() => {
    message.editContent(content, (err) => {
      if (err) {
        return false;
      }
      return false;
    });
  }, 1000);
}

export function emoteHandler(context) {
  const { message, emotes, server } = context;

  if (!server || !server.emotes) {
    return;
  }

  const words = message.content.split(/\s+/);

  const promises = [
    lookupInternalEmotes(words, emotes),
    lookupServerEmotes(words, server),
  ];

  Promise.all(promises)
    .then(results => [].concat.apply([], results))
    .then(results => {
      let content = message.content;

      results.forEach(result => {
        content = content.replace(/(?!\s+)\S+/, (match) => {
          if (match === result.code) {
            return result.url;
          }

          return match;
        });

        // content = content.split(result.code).join(result.url);
      });

      // If message has been modified
      if (content !== message.content) {
        message.editContent(content, (err) => {
          if (err) {
            const counter = 0;
            const loop = editErrorHandler(message, content, counter);
            if (loop === false) return;
          }
        });
      }
    });
}
