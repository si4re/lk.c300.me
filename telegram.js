var TelegramBot = require('node-telegram-bot-api');
var token = '185978441:AAFNgcQUTgfZ1mqhQQsWV4hpToBtggXDEq8';
var bot = new TelegramBot(token, { polling: true });


var fs = require("fs");


var debtValue = fs.readFileSync("debt.txt");

 if (debtValue != 456) {
     bot.sendMessage(152847349, "Текущая задолженность по кварплате= " + debtValue + " руб.", { caption: "I'm a bot!" });
        }

    

bot.on('message', function (msg) {
    var chatId = msg.chat.id;
    console.log(msg);
    if(msg.text == 'balance') {
        fs.exists('balance.png', function (exists) {
            if(exists)   
                bot.sendPhoto(chatId, 'balance.png', {caption: "It's your after login photo!"});  
    });
    }
});