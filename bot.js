// Require Modules
const Discord = require("discord.js");
const cron = require('node-cron');

// Create a discord client.
const client = new Discord.Client();

//Make a var for stop reminder.
var stopReminder = false;

// When ready run code.
client.once('ready', () => {
    console.log("Ready!");
});

client.once('ready', () => {
    cron.schedule('*/2 8 * * *', () => {
        console.log("its 8 am.");
        reminderTimer();
    });
});

function reminderTimer(){
    console.log("Sending Reminders..."); 
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

cron.schedule('0 7 * * *', () => {
    stopReminder = false;
    console.log("Stop Reminder Set to false")
  }, {
    scheduled: true,
    timezone: "Africa/Casablanca"
});

// Use token to login to the bot.
client.login(process.env.BOT_TOKEN || "NzU4Nzg5Njc3OTgwOTc1MTQ0.X20D9A.CYTdHxo8WClvViiFAKTs998XroA");