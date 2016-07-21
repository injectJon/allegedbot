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

export function internalEmoteHandler(context, content, response) {
  const { emotes, server } = context;

  if (!server) {
    return;
  }

  const words = content.split(/\s+/);

  const promises = [
    lookupInternalEmotes(words, emotes),
    lookupServerEmotes(words, server),
  ];

  Promise.all(promises)
    .then(results => [].concat.apply([], results))
    .then(results => {
      results.forEach(result => {
        content = content.replace(/(?!\s+)\S+/g, (match) => {
          if (match === result.code) {
            return result.url;
          }

          return match;
        });
      });

      return response(content);
    });
}
