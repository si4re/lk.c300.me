var TelegramBot = require('node-telegram-bot-api');
var token = '185978441:AAFNgcQUTgfZ1mqhQQsWV4hpToBtggXDEq8';
var bot = new TelegramBot(token, { polling: true });


var fs = require("fs");


var debtValue = fs.readFileSync("debt.txt");

 if (debtValue != 0) {
     bot.sendMessage(152847349, "Текущая задолженность = " + debtValue + " руб.", { caption: "I'm a bot!" });
        }

    


bot.on('message', function (msg) {
    var chatId = msg.chat.id;
    console.log(msg);
    bot.sendMessage(chatId, "Hello!", {caption: "I'm a bot!"});
});
