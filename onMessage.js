
'use strict';


var onMessage = function (message, server, emotes, blackList) { //--- On message function

// Emote Replacement 
	if (server.emote) {

		var spamCheck = 0;
	    var content = message.content.replace(/(?!\s+)\S+/g, (match) => {

	        if (match.length <= 4) {         // Ignore matches with 4 or less characters
	            return match;
	        }
	        if (blackList[match]) {         // Ignore blacklisted emotes
	            return match;
	        }

	        
	        if (emotes[match]) {	// Check for match in emote list
	   
	        	spamCheck += 1;

	        	return emotes[match].url

	    	} else return match;
	    })

	    if (content !== message.content) {      // Actual send message function
	        
	    	if (spamCheck <= 15){		// Emote spam check
	        	message.editContent(content);
	        	console.log('      Replaced emote(s) for: { ' + message.senderName + ': '+ message.senderID +' }');
	    		spamCheck = 0;

	    	} else {		// What to do with spam
	    		message.deleteMessage();
	    		message.reply('_*Message deleted:*_  *the message contained more than 15 emotes.*');
	    		console.log('Deleted ' + message.senderName + '\'s message. It contained ' + spamCheck + ' emotes.');
	    		spamCheck = 0;

	    	}

	    } else spamCheck = 0;		// Reset the spam checker
	}
// !cmdlist 
	if (server.cmd) {
	    var cmdCheck = message.content;
	    (cmdCheck.startsWith('!cmdlist'))
	        ? message.reply('_Commands:_ *!8ball , !bully , !love* \n_Emotes:_ Currently supporting all *Twitch Global/Subscriber* & *BTTV* emotes')
	        : cmdCheck;
    }

// !bully 
	if (server.bully) {
	    var bullyMessage = message.content;
	    if (bullyMessage.startsWith('!bully')) {
	        bullyMessage = bullyMessage.replace('!bully ', '');

	        var bullyOdds = Math.random();

	        (bullyOdds >= 0.65)
	            ? message.reply('*' + message.senderName + '* bullied ' + bullyMessage + ' with ~GREAT~ success!  quinJudy')
	            : message.reply('*' + message.senderName + '* failed to bully ' + bullyMessage + '. What a ~PLEB!~  alkXD');
	    }
    }

// !love 
	if (server.love) {
	    var loveMessage = message.content;
	    if (loveMessage.startsWith('!love')) {
	        loveMessage = loveMessage.replace('!love ', '');

	        var loveOdds = Math.round(100 * Math.random());
	        
	        message.reply("There's " + loveOdds + '% bleedPurple between ' + loveMessage + ' and ' + message.senderName);
	    }
    }

// !8ball 
	if (server.eightball) {
	    var eightBall = message.content;
	    if (eightBall.startsWith('!8ball')) {
	        var eightBallRoll = Math.floor(Math.random() * 19) + 1;
	            switch(eightBallRoll) {
	                case 1:
	                    message.reply('Yes');
	                    break;
	                case 2:
	                    message.reply('No');
	                    break;
	                case 3:
	                    message.reply('Certainly');
	                    break;
	                case 4:
	                    message.reply('Signs point to yes');
	                    break;
	                case 5:
	                    message.reply('Probably not');
	                    break;
	                case 6:
	                    message.reply('Doubtful');
	                    break;
	                case 7:
	                    message.reply('Yes definitely');
	                    break;
	                case 8:
	                    message.reply('You may rely on it');
	                    break;
	                case 9:
	                    message.reply('Concentrate and ask again');
	                    break;
	                case 10:
	                    message.reply("I don't know");
	                    break;
	                case 11:
	                    message.reply('It is undecidedly so');
	                    break;
	                case 12:
	                    message.reply('Unsure');
	                    break;
	                case 13:
	                    message.reply('My reply is no');
	                    break;
	                case 14:
	                    message.reply('Cannot predict now');
	                    break;
	                case 15:
	                    message.reply('My sources say no');
	                    break;
	                case 16:
	                    message.reply('My sources say yes');
	                    break;
	                case 17:
	                    message.reply('My reply is yes');
	                    break;
	                case 18:
	                    message.reply('You cannot rely on it');
	                    break;
	                case 19:
	                    message.reply('Not a chance, ~cunt~ alkSuper quinD');
	            }
	    }
    }

}   //------------------------------------------- End on message function

module.exports.onMessage = onMessage;