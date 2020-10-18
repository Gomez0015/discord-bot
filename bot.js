// Require Modules
const Discord = require("discord.js");
const config = require('./config.json');

// Create a discord client.
const client = new Discord.Client();

//Make a Date Variable
var event = new Date();

//Make a var for stop reminder.
var stopReminder = false;

currentHour = event.getUTCHours();

currentMinute = event.getUTCMinutes();

// When ready run code.
client.once('ready', () => {
    console.log("Ready!");
});

if(currentHour == 7){
    client.once('ready', () => {
        reminderTimer();
    }); 
}

function reminderTimer(){
    setInterval(function () {
        if(stopReminder == false){   
            client.users.cache.get("366327612014067722").send("Take ur pills. Its an order.");
        } else {
            clearInterval();
        }
    }, 300000);            
    
}

client.on('message', msg => {
    if (msg.channel.type == "dm") {
        if (msg.content === "Stop"){
             stopReminder = true;
             msg.reply("Reminder Stopped");
         }
     }
});

if(currentHour == 6){
    stopReminder = false;
}

// Use token to login to the bot.
client.login(ENV['BOT_TOKEN']);