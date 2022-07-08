const Discord = require("discord.js")
module.exports = {
    name: "guildMemberRemove",
    run: async (member)=>{
        // const memberLeft = new Discord.MessageEmbed()
        // .setColor("#800000")
        // .setDescription(`${member.user} покинул сервер!`)
        // .setTitle("Кто-то вышел из сервера! 🙁")
        // .setImage(member.user.avatar)
        // .setTimestamp();

         member.guild.channels.cache.get("994042976131104828").send(`${member.user} покинул сервер! 🙁`);
    }
}