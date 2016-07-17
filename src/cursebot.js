
import { Client } from 'cursejs';
import Promise from 'bluebird';
import _ from 'lodash';
import mongoose from 'mongoose';

import { emoteHandler, commandHandler } from './handlers';
import { options } from './config';

import { Server } from './model';

const request = Promise.promisifyAll(require('request'));

// Initiate mongodb connection
mongoose.connect('mongodb://localhost:27017/cursebot');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//---------------------------------------------------------------------------

// Thanks Akira

// Json URL's
const TWITCH_IMAGES_URL = 'https://twitchemotes.com/api_cache/v2/images.json';
const BTTVG_EMOTE_URL = 'https://api.betterttv.net/2/emotes';
const BTTV_EMOTE_URL = 'https://raw.githubusercontent.com/Jiiks/BetterDiscordApp/master/data/emotedata_bttv.json';
const BLACKLIST_URL = 'https://raw.githubusercontent.com/Jiiks/BetterDiscordApp/master/data/emotefilter.json';

// Emote URL Templates
const TWITCH_URL_TEMPLATE = 'https://static-cdn.jtvnw.net/emoticons/v1/{image_id}/1.0';
const BTTV_URL_TEMPLATE = 'https://cdn.betterttv.net/emote/{image_id}/2x';

// Global variables
const emoteWhitelist = ['LUL'];

const emotes = {
  N1neXD: {
    code: 'N1neXD',
    url: 'https://cdn.betterttv.net/emote/5756e1d5318862cb5fb1b95f/1x',
  },
};

const blacklist = [];


const app = new Client();

function lookupServerId(message) {
  if (!app.channels[message.conversation.ID]) {
    return undefined;
  }
  return app.channels[message.conversation.ID].server.ID;
}

function handleServerMessage(handler) {
  return (message) => {
    const serverId = lookupServerId(message);
    if (!serverId) {
      console.log('Private Message');
      return; // Message is not to a server, ignore.
    }

    Server.findByServerId(serverId)
      .then(server => handler({ message, emotes, server, serverId }))
      .catch(err => console.log(`Unknown Error: ${err}`));
  };
}

app.on('message_received', handleServerMessage(context => {
  emoteHandler(context);
  commandHandler(context);
}));

app.on('message_edited', handleServerMessage(context => {
  emoteHandler(context);
}));

// Download/Load functions

// ------- DOWNLOAD JSON FILES ---------
function downloadJson(url) {
  console.log('Downloading Json...');
  return request.getAsync(url)
    .then(response => {
      if (response.statusCode >= 200 && response.statusCode < 300) {
        return JSON.parse(response.body);
      }

      return Promise.reject(`${response.statusCode}: ${response.statusMessage}`);
    });
}

function isEmoteAllowed(emote) {
  const isTooShort = emote.length < 4;
  const isBlacklisted = blacklist.includes(emote);
  const isWhitelisted = emoteWhitelist.includes(emote);

  return isWhitelisted || !(isTooShort || isBlacklisted);
}

// ------- TWITCH EMOTES ---------------
function loadTwitchEmoteData(data) {
  _.forEach(data.images, (emote, id) => {
    if (isEmoteAllowed(emote)) {
      emotes[emote.code] = {
        code: emote.code,
        url: TWITCH_URL_TEMPLATE.replace('{image_id}', id),
      };
    }
  });
}

// ------- BTTV Global Emotes-----------
function loadBTTVGEmoteData(data) {
  _.forEach(data.emotes, (emote) => {
    if (isEmoteAllowed(emote)) {
      emotes[emote.code] = {
        code: emote.code,
        url: BTTV_URL_TEMPLATE.replace('{image_id}', emote.id),
      };
    }
  });
}

// ------- BTTV User Emotes-------------
function loadBTTVUEmoteData(data) {
  _.forEach(data, (id, emote) => {
    if (isEmoteAllowed(emote)) {
      emotes[emote] = {
        code: emote,
        url: BTTV_URL_TEMPLATE.replace('{image_id}', id),
      };
    }
  });
}

// ------- BLACKLIST -------------------
function loadBlackListData(data) {
  blacklist.push(...data.blacklist);
}

Promise
  .props({
    twitchEmotes: downloadJson(TWITCH_IMAGES_URL),
    bttvGlobalEmotes: downloadJson(BTTVG_EMOTE_URL),
    bttvEmotes: downloadJson(BTTV_EMOTE_URL),
    blacklist: downloadJson(BLACKLIST_URL),
  })
  .then(props => {
    loadBlackListData(props.blacklist);
    loadTwitchEmoteData(props.twitchEmotes);
    loadBTTVGEmoteData(props.bttvGlobalEmotes);
    loadBTTVUEmoteData(props.bttvEmotes);

    app.run(options.username, options.password);
  });
