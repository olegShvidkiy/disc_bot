const Discord = require("discord.js")
module.exports = {
    name: "guildMemberAdd",
    run: async (member)=>{
        console.log("new user");
        const newMember = new Discord.MessageEmbed()
        .setColor("#7FFF00")
        .setDescription(`${member.user} только что присоеденился к серверу!`)
        .setTitle("Новый пользователь! 😃")
        .setImage(member.user.avatar)
        .setTimestamp();

        member.send("https://docs.google.com/forms/d/1Nl95IdjRAmtvg5Aj_Zc7Gz4mCphVd5yYRmO9C3idd_g");

        member.guild.channels.cache.get("994042976131104828").send({ embeds: [newMember]});



    }
}