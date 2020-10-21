// Require Modules
const Discord = require("discord.js");
const cron = require('node-cron');
const commands = require('./Commands.js');

//Exports
let basicResponseArray = commands.basicResponses;

prefix = process.env.BOT_PREFIX;

// Create a discord client.
const client = new Discord.Client();

//Make a var for stop reminder.
var stopReminder = false;

// When ready run code.
client.once('ready', () => {
    console.log("Ready!");
});

//Mary Pill Reminder Start
client.once('ready', () => {
    cron.schedule('*/5 7 * * *', () => {
        reminderTimer();
    });
});

client.once('ready', () => {
    cron.schedule('0 7 * * *', () => {
        console.log("its 9 am...");
        reminderTimer();
    });
});

function reminderTimer(){
    console.log("Sending Reminder..."); 
    if(stopReminder == false){  
        client.users.cache.get("366327612014067722").send("Take ur pills. Its an order.");
    }        
}

client.on('message', msg => {
    if (msg.channel.type == "dm") {
        if (msg.content === "Stop"){
             stopReminder = true;
             msg.reply("Reminder Stopped");
             console.log("Stopping Reminder...");
         }
     }
});

cron.schedule('0 6 * * *', () => {
    stopReminder = false;
    console.log("Stop Reminder Set to false...")
});
//Mary Pill Reminder End

//Welcome msg
client.on('guildMemberAdd', member => {
    member.guild.channels.get('758793497246957629').send("Welcum to da sever m8"); 
});

//Basic Commands
client.on('message', msg => {
    if (msg.author.bot) return;
    if (msg.channel.type == "text") {
        basicResponseArray.forEach(item => {
            if(msg.content === item.question){
                msg.reply(item.answer);
            }          
        });         
    }
});

//Answers the "xcommands" Question
var allCommands = [];

module.exports = function getAllCommands(){

    basicResponseArray.forEach((item, index) => {
        if (index === basicResponseArray.length - 1){ 
            allCommands.push(item.question); 
        } else {
            allCommands.push(item.question + ', ');
        }
    });

    return allCommands;
};

client.once('reconnecting', () => {
 console.log('Reconnecting!');
});
client.once('disconnect', () => {
 console.log('Disconnect!');
});

// Use token to login to the bot.
client.login(process.env.BOT_TOKEN);