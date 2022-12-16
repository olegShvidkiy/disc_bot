const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const Discord = require("discord.js");
const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: "getMembers",
    description: "Return all user nicknames and their time on server",
    admin: true,

    run: async (client, message, args) => {
        // console.log("PERMISSIONS", message.member.permissions.has("ADMINISTRATOR"))
        console.log(message.member.permissions.has(PermissionsBitField.Flags.Administrator))
        // if (!message.member.permissions.has("ADMINISTRATOR")) return;
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !message.member.roles.cache.has("1006638559664545925")) return;


        const guild = client.guilds.cache.get(message.guildId);

        guild.members.fetch()
            .then(async members => {
                const membersInfo = await members.map((member) => getUserInfo(member, message));
                writeToCSV(membersInfo, message);
            })
            .catch(console.error);
    }
}

const getUserInfo = async (member, message) => {
    const date = new Date(member.joinedTimestamp);

    const joinDate = date.getDate() +
        "/" + (date.getMonth() + 1) +
        "/" + date.getFullYear() +
        " " + date.getHours() +
        ":" + date.getMinutes() +
        ":" + date.getSeconds();

    const timeFromJoinInMil = new Date().getTime() - date.getTime();
    const timeFromJoinInSec = Math.floor(timeFromJoinInMil / 1000);
    const timeFromJoinInMin = Math.floor(timeFromJoinInSec / 60);
    const timeFromJoinInHours = Math.floor(timeFromJoinInMin / 60);
    const timeFromJoinInDays = Math.floor(timeFromJoinInHours / 24);
    const timeFromJoinInMonth = Math.floor(timeFromJoinInDays / 30);
    const timeFromJoinInYears = Math.floor(timeFromJoinInMonth / 12);

    const timeFromJoin = `Time on server: Years ${timeFromJoinInYears}, Month: ${timeFromJoinInMonth % 12}, Days: ${timeFromJoinInDays % 30}, Hours: ${timeFromJoinInHours % 24}, Minutes: ${timeFromJoinInMin % 60} `
    let roles = [];
    await member._roles.forEach(async roleID => {
        await message.guild.roles.fetch(roleID).then(role => roles.push(role.name))
    })

    return { bot: member.user.bot, nickname: member.user.username + "#" + member.user.discriminator, roles, joinDate, timeFromJoin };
}

const writeToCSV = async (membersInfo, message) => {
    const csvWriter = createCsvWriter({
        path: 'data.csv',
        header: [
            { id: 'nick', title: 'Nickname' },
            { id: 'joinDate', title: 'Join Date' },
            { id: 'time', title: 'Time on Server' },
            { id: 'roles', title: 'Roles' }
        ]
    });
    let data = [];

    await membersInfo.forEach(async member => {
        await member.then(res => {
            const obj = {
                nick: res.nickname,
                joinDate: res.joinDate,
                time: res.timeFromJoin,
                roles: res.roles ? res.roles.join(", ") : ""
            }

            if (!res.bot) data.push(obj);
        })
    });
    // const button = new Discord.MessageButton().setCustomId('button1').setLabel("test").setStyle("SUCCESS");
    // const buttons = new Discord.MessageActionRow();
    // buttons.addComponents(button);
    // message.channel.send({
    //     content: 'test',
    //     components: [buttons]
    // })
    csvWriter
        .writeRecords(data)
        .then(() => message.channel.send({
            files: [{
                attachment: './data.csv',
                name: 'data.csv',
                description: 'A description of the file'
            }]
        }));
}