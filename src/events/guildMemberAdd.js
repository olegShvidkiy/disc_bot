const Discord = require("discord.js");
const config = require("../../config.json");
module.exports = {
    name: "guildMemberAdd",
    run: async (member) => {
        console.log(member)

        const newMember = new Discord.MessageEmbed()
            .setColor("#7FFF00")
            .setTitle('✅Новый пользователь! ')
            .setDescription(`${member.user.tag} только что присоеденился к серверу!`)
            .setThumbnail(member.user.avatarURL())
            .setFooter('Всего пользователей: ' + member.guild.memberCount);
        //отправляем пользователю ссылку на опрос
        //member.send("https://docs.google.com/forms/d/1Nl95IdjRAmtvg5Aj_Zc7Gz4mCphVd5yYRmO9C3idd_g");

        member.guild.channels.cache.get(config.welcomeMessageChannel).send({ embeds: [newMember] });



    }
}