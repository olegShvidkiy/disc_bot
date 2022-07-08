const Discord = require("discord.js")
module.exports = {
    name: "guildMemberAdd",
    run: async (member)=>{
        const newMember = new Discord.MessageEmbed()
        .setColor("#7FFF00")
        .setDescription(`${member.user} только что присоеденился к серверу!`)
        .setTitle("Новый пользователь! 😃")
        .setImage(member.user.avatar)
        .setTimestamp();

        member.send("Hello");

        member.guild.channels.cache.get("994042976131104828").send({ embeds: [newMember]});



    }
}