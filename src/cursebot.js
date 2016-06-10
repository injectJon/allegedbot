
import { Client } from 'cursejs';
import Promise from 'bluebird';
import _ from 'lodash';

import { onMessage } from './onMessage';
import { servers, options } from './config';

const request = Promise.promisifyAll(require('request'));

//---------------------------------------------------------------------------

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
const emotes = {};        // full list of emote data
const blackList = {};     // blacklisted emotes

const app = new Client();

// Server Options

function messageHandler(message) {
  let sID;
  let sName;

  if (app.channels[message.conversation.ID]) {
    sID = app.channels[message.conversation.ID].server.ID; // server ID
    sName = app.channels[message.conversation.ID].server.name; // server name

    // console.log(`Server Name: ${sName} \n  Server ID: ${sID}`);
  }

  servers.forEach(server => {
    if (sID === server.id) {
      onMessage(message, server, emotes, blackList);
    }
  });
}


app.on('message_received', messageHandler);
app.on('message_edited', messageHandler);


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

// ------- TWITCH EMOTES ---------------
function loadTwitchEmoteData(data) {
  _.forEach(data.images, (emote, id) => {
    emotes[emote.code] = {
      code: emote.code,
      url: TWITCH_URL_TEMPLATE.replace('{image_id}', id),
    };
  });
}

// ------- BTTV Global Emotes-----------
function loadBTTVGEmoteData(data) {
  _.forEach(data.emotes, (emote) => {
    emotes[emote.code] = {
      code: emote.code,
      url: BTTV_URL_TEMPLATE.replace('{image_id}', emote.id),
    };
  });
}

// ------- BTTV User Emotes-------------
function loadBTTVUEmoteData(data) {
  _.forEach(data, (id, emote) => {
    emotes[emote] = {
      code: emote,
      url: BTTV_URL_TEMPLATE.replace('{image_id}', id),
    };
  });
}

// ------- BLACKLIST -------------------
function loadBlackListData(data) {
  _.forEach(data.blacklist, (emote) => {
    blackList[emote] = {
      code: emote,
    };
  });
}


Promise
  .props({
    twitchEmotes: downloadJson(TWITCH_IMAGES_URL),
    bttvGlobalEmotes: downloadJson(BTTVG_EMOTE_URL),
    bttvEmotes: downloadJson(BTTV_EMOTE_URL),
    blackList: downloadJson(BLACKLIST_URL),
  })
  .then(props => {
    loadTwitchEmoteData(props.twitchEmotes);
    loadBTTVGEmoteData(props.bttvGlobalEmotes);
    loadBTTVUEmoteData(props.bttvEmotes);
    loadBlackListData(props.blackList);

    app.run(options.username, options.password);
  });
