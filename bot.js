// Require Modules
const Discord = require("discord.js");
var cron = require('node-cron');


// Create a discord client.
const client = new Discord.Client();

//Make a var for stop reminder.
var stopReminder = false;

// When ready run code.
client.once('ready', () => {
    console.log("Ready!");
});

cron.schedule('0 8 * * *', () => {
    client.once('ready', () => {
        reminderTimer();
    }); 
  }, {
    scheduled: true,
    timezone: "Africa/Casablanca"
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

cron.schedule('0 7 * * *', () => {
    stopReminder= false;
  }, {
    scheduled: true,
    timezone: "Africa/Casablanca"
});

// Use token to login to the bot.
client.login(process.env.BOT_TOKEN);