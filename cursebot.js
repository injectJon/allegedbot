
'use strict';

//---------------------------------------------------------------------------
var USERNAME = 'emoteBot';
var PASSWORD = 'SheepFarmer69';
//---------------------------------------------------------------------------

// Thanks Akira

// Dependancies 
    var Client = require('cursejs').Client;
    var Promise = require('bluebird');
    var _ = require('lodash');

    var fs = Promise.promisifyAll(require('fs'));
    var request = Promise.promisifyAll(require('request'));

    
    var onMessage = require('./onMessage.js').onMessage;

// Load all files in servers dir <in development>
    // fs.readdirSync('C:/Users/Rebel8/Desktop/cursevoicebot/lib/servers').forEach(function(filename) {
    //     if(filename.indexOf('.js')) {
    //         require('C:/Users/Rebel8/Desktop/cursevoicebot/lib/servers/' + filename);
    //         console.log(filename + 'was loaded to the script.');
    //     }
    // });

// Json URL's 
    var TWITCH_IMAGES_URL = 'https://twitchemotes.com/api_cache/v2/images.json';
    var BTTVG_EMOTE_URL = 'https://api.betterttv.net/2/emotes';
    var BTTV_EMOTE_URL = 'https://raw.githubusercontent.com/Jiiks/BetterDiscordApp/master/data/emotedata_bttv.json';
    var BLACKLIST_URL = 'https://raw.githubusercontent.com/Jiiks/BetterDiscordApp/master/data/emotefilter.json';

// Emote URL Templates 
    var TWITCH_URL_TEMPLATE = 'https://static-cdn.jtvnw.net/emoticons/v1/{image_id}/1.0';
    var BTTV_URL_TEMPLATE = 'https://cdn.betterttv.net/emote/{image_id}/2x';

// Global variables 
    var emotes = {};        // full list of emote data
    var blackList = {};     // blacklisted emotes

    var app = new Client();

// Server Options 
    var emotebot = {
            server: 'f649f95c-daf9-44c3-beda-bb801ea73032',
            emote: true,
            espam: 50,
            cmd: true,
            bully: true,
            love: true,
            eightball: true
        };

    var xarathoss = {
            server: 'da59264c-e1a0-4602-93c7-0847e31f2fe3',
            emote: true,
            espam: 15,
            cmd: true,
            bully: true,
            love: true,
            eightball: true
        };

    var quin69 = {
            server: 'a6932828-c635-4d4a-8743-7f589ff644d7',
            emote: true,
            espam: 15,
            cmd: true,
            bully: true,
            love: true,
            eightball: true
        };


app.on('message_received', function(message) {

    var cID = message.conversation.ID;  // channel ID

    if(app.channels[message.conversation.ID] != undefined){

        var sID = app.channels[message.conversation.ID].server.ID; // server ID

        var sName = app.channels[message.conversation.ID].server.name; // server name

    }

    // Log's server name and ID ~ useful data 
    console.log(' Server Name: ' + sName +
                     '\n   Server ID: ' + sID);


    // Quin69's on message function (lib/servers/quin69.js)
     if (sID === quin69.server) {

         onMessage(message, quin69, emotes, blackList);

     }

     if (sID === xarathoss.server) {

         onMessage(message, xarathoss, emotes, blackList);

     }

     if (sID === emotebot.server) {

         onMessage(message, emotebot, emotes, blackList);

     }
});
    


app.on('message_edited', function (message) {
  
   var cID = message.conversation.ID;  // channel ID

    if(app.channels[message.conversation.ID] != undefined){

        var sID = app.channels[message.conversation.ID].server.ID; // server ID

        var sName = app.channels[message.conversation.ID].server.name; // server name

    }

     if (sID === quin69.server) {

         onMessage(message, quin69, emotes, blackList);

     }

     if (sID === xarathoss.server) {

         onMessage(message, xarathoss, emotes, blackList);

     }

     if (sID === emotebot.server) {

         onMessage(message, emotebot, emotes, blackList);

     }
});




// Download/Load functions 

    //------- DOWNLOAD JSON FILES ---------
    function downloadJson(url) {
        console.log('Downloading Json...');
        return request.getAsync(url)
            .then(response => {
                if (response.statusCode >= 200 && response.statusCode < 300) {
                    return JSON.parse(response.body);
                } else {
                    return Promise.reject(response.statusCode + ": " + response.statusMessage);
                }
            });
    }

    //------- TWITCH EMOTES ---------------
    function loadTwitchEmoteData(data) {
        _.forEach(data.images, (emote, id) => {
            emotes[emote.code] = {
                code: emote.code,
                url: TWITCH_URL_TEMPLATE.replace('{image_id}', id)
            };
        });
    }

    //------- BTTV Global Emotes-----------
    function loadBTTVGEmoteData(data) {
        _.forEach(data.emotes, (emote, id) => {
            emotes[emote.code] = {
                code: emote.code,
                url: BTTV_URL_TEMPLATE.replace('{image_id}', emote.id)
            };
        });
    }

    //------- BTTV User Emotes-------------
    function loadBTTVUEmoteData(data) {
        _.forEach(data, (id, emote) => {
            emotes[emote] = {
                code: emote,
                url: BTTV_URL_TEMPLATE.replace('{image_id}', id)
            };
        });
    }

    //------- BLACKLIST -------------------
    function loadBlackListData(data) {
        _.forEach(data.blacklist, (emote) => {
            blackList[emote] = {
                code: emote
            };
        });
    }

    //------- MEMBER LIST -----------------

Promise
    .props({
        twitchEmotes: downloadJson(TWITCH_IMAGES_URL),
        bttvGlobalEmotes: downloadJson(BTTVG_EMOTE_URL),
        bttvEmotes: downloadJson(BTTV_EMOTE_URL),
        blackList: downloadJson(BLACKLIST_URL)
    })
    .then(props => {
        loadTwitchEmoteData(props.twitchEmotes);
        loadBTTVGEmoteData(props.bttvGlobalEmotes);
        loadBTTVUEmoteData(props.bttvEmotes);
        loadBlackListData(props.blackList);

        app.run(USERNAME, PASSWORD);
    })
