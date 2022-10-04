const fs = require("fs");
const Discord = require("discord.js");
module.exports.init = (bot)=>{
    bot.commands = new Discord.Collection();
    fs.readdirSync("src/commands").filter( file =>file.endsWith(".js")).forEach( file => {
        const commandName = file.substr(0, file.indexOf("."));
        const command = require(`../commands/${commandName}`);
        bot.commands.set(commandName, command);
    });
}
