const Discord = require("discord.js");
const config = require("../../config.json");
const { EmbedBuilder } = require('discord.js');


module.exports = {
    name: "guildMemberRemove",
    run: async (bot, member) => {
        Log.init(bot)
        try {
            const message = new EmbedBuilder()
                .setColor("#7FFF00")
                .setTitle('Пользовтель покинул сервер')
                .setDescription(`${member.user.tag} только что покинул сервер!`)
                .setThumbnail(member.user.avatarURL())
                .setFooter({ text: 'Всего пользователей: ' + member.guild.memberCount });
            member.guild.channels.cache.get(config.welcomeMessageChannel).send({ embeds: [message] });
        } catch (e) {
            Log.error(`[COMMANDS/memberRemove] Ошибка создания уведомления: ${e}`);
        }

    }
}