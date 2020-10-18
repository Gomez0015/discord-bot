// Require Modules
const Discord = require("discord.js");

// Create a discord client.
const client = new Discord.Client();

//Make a Date Variable
var event = new Date();

currentHour = event.getUTCHours();

// When read run code.
client.once('ready', () => {
    console.log("Ready!");
    console.log(currentHour);
});

if(currentHour == 7){
    client.once('ready', () => {
        client.users.cache.get("366327612014067722").send("Take ur pills. Its an order.");
    });
}

// Use token to login to the bot.
client.login('NzU4Nzg5Njc3OTgwOTc1MTQ0.X20D9A.aoGyTeqw1kAzLjzbb7Rbd925N_0');