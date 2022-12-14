const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "guildMemberRemove",
    run: async (bot, member) => {
        const message = new Discord.MessageEmbed()
            .setColor("#7FFF00")
            .setTitle('Пользовтель покинул сервер')
            .setDescription(`${member.user.tag} только что покинул сервер!`)
            .setThumbnail(member.user.avatarURL())
            .setFooter('Всего пользователей: ' + member.guild.memberCount);
        // config.welcomeMessageChannel
        member.guild.channels.cache.get(config.welcomeMessageChannel).send({ embeds: [message] });
    }
}