const Discord = require("discord.js");
const Logger = require("../structures/Logger");
const axios = require('axios');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;



module.exports = {
    name: "getMembers",
    description: "Return all user nicknames and their time on server",
    admin: true,
    run: async (client, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has("1006638559664545925")) return;
        Log.init(client);
        const file = message.attachments.first()?.url;


        if (!file) {
            message.channel.send("Не прикреплен файл!");
            return;
        }
        try {
            const res = await axios.get(file);

            const data = res.data.split("\r\n");
            data.pop();

            const guild = client.guilds.cache.get(message.guildId);
            const mem = await guild.members.fetch();
            const notFound = [];
            let counter = 0;
            data.forEach(async username => {
                let discriminator;
                const nickname = username.includes("#") ? username.slice(0, -5) : username;
                if (username.includes("#")) {
                    discriminator = username.slice(-4);
                }

                const user = mem.find(m => discriminator ? (m.user.username === nickname && m.user.discriminator === discriminator) : m.user.username === nickname);
                if (!user) {
                    notFound.push(username);
                    return;
                }
                counter++;
                if (args[0]) user.send(args.join(" "));
            })
            if (notFound.length) writeToCSV(notFound, message);
            message.channel.send({ content: `Cообщение отправлено ${counter} пользователям!` })

        } catch (e) {
            Log.error(`[COMMANDS/SendMessage] Ошибка при считывании файла: ${e}`);
        }

    }
}

const writeToCSV = async (data, message) => {
    const csvWriter = createCsvWriter({
        path: 'notFound.csv',
        header: [
            { id: 'nick', title: 'Nickname' },
        ]
    });
    const newData = data.map(user => { return { nick: user } });
    csvWriter
        .writeRecords(newData)
        .then(() => message.channel.send({
            content: "Не найденые пользователи:",
            files: [{
                attachment: './notFound.csv',
                name: 'notFound.csv',
                description: 'users what not founded'
            }]
        }));
}