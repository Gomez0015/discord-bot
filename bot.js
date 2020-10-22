// Require Modules
const Discord = require("discord.js");
const cron = require('node-cron');
const commands = require('./Commands.js');

//Exports
let basicResponseArray = commands.basicResponses;

prefix = process.env.BOT_PREFIX || "x";

// Create a discord client.
const client = new Discord.Client();

//Make a var for stop reminder.
var stopReminder = false;

//Make a var for Commands Array
var allCommandsArray = [];

// When ready run code.
client.once('ready', () => {
    console.log("Ready!");
});

//Mary Pill Reminder Start
client.once('ready', () => {
    cron.schedule('*/5 7 * * *', () => {
        if(stopReminder == false){ 
            reminderTimer();
        }
    });
});

function reminderTimer(){
    console.log("Sending Reminder..."); 
    client.users.cache.get("366327612014067722").send("Take ur pills. Its an order.");      
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
        if(msg.content === "xcommands"){
            msg.reply(JSON.stringify(allCommandsArray));
        }            
    }
});

//Answers the "xcommands" Question

function getAllCommands() {

    basicResponseArray.forEach((item) => {
        if(allCommandsArray.length < basicResponseArray.length){
            allCommandsArray.push(item.question);
        }else if(allCommandsArray.length = basicResponseArray.length){
            return;
        }
    });
};

getAllCommands();

client.once('reconnecting', () => {
 console.log('Reconnecting!');
});
client.once('disconnect', () => {
 console.log('Disconnect!');
});

// Use token to login to the bot.
client.login(process.env.BOT_TOKEN);