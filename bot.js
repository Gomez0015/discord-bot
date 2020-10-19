// Require Modules
const Discord = require("discord.js");
const schedule = require('node-schedule');


// Create a discord client.
const client = new Discord.Client();

//Make a Date Variable
var event = new Date();

//Make a var for stop reminder.
var stopReminder = false;

currentHour = event.getUTCHours();

// When ready run code.
client.once('ready', () => {
    console.log("Ready!");
    console.log(currentHour);
});

var startTimer = schedule.scheduleJob('9 * * *', function(){
    client.once('ready', () => {
        reminderTimer();
    }); 
});

function reminderTimer(){
    console.log("Sending Reminders..."); 
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
             console.log("Stopping Reminder...");
         }
     }
});

var resetVar = schedule.scheduleJob('8 * * *', function(){
    stopReminder= false;
});

// Use token to login to the bot.
client.login(process.env.BOT_TOKEN);