const Discord = require("discord.js")
module.exports = {
    name: "guildMemberRemove",
    run: async (member)=>{
         member.guild.channels.cache.get("994042976131104828").send(`${member.user} покинул сервер! 🙁`);
    }
}