const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: "guildMemberRemove",
    run: async (member)=>{
         member.guild.channels.cache.get(config.welcomeMessageChannel).send(`${member.user} покинул сервер! 🙁`);
    }
}