const Discord = require("discord.js");
const fs = require("fs");
let config = require("./config.json");
const prefix = config.commandPrefix;
const bot = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS" ]});
require('./src/handlers/commands').init(bot);
require('./src/handlers/events').init(bot);
require('dotenv').config()


bot.login(process.env.TOKEN);

bot.on("error", error => console.log(error))

bot.on("messageCreate", function(message) {
    if(message.content.startsWith(prefix)){
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandName = args.shift();
        const command = bot.commands.get(commandName);
        if(!command) return
        // if(command.admin && !message.member.roles.cache.has("995240388178751519")) return;
        command.run(bot, message, args);
    }   
});

module.exports = bot;
