const Discord = require("discord.js"),
    fs = require("fs"),
    bot = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] }),
    ConfigUtil = require("./src/structures/ConfigUtil.js"),
    Logger = require("./src/structures/Logger.js");


global.Config = new ConfigUtil();
global.Log = new Logger()
require('dotenv').config()

bot.login(process.env.TOKEN_TEST).then(async () => {
    await Log.init(bot);
    Log.send("Иннициализация бота.");
    require('./src/handlers/commands').init(bot);
    require('./src/handlers/events').init(bot);
});

bot.on("error", Log.error);
bot.on("warn", Log.warn);


// bot.on("ready", () => {
//     // const button = new Discord.MessageButton().setCustomId('start').setLabel("Начать оплату").setStyle("SUCCESS");
//     // const buttons = new Discord.MessageActionRow();
//     // buttons.addComponents(button);
//     // console.log(bot.channels.cache.get("1021866420839121008"))
//     // bot.channels.cache.get("1051851355809128559").send({
//     //     content: "Покупка подписки",
//     //     components: [buttons]
//     // })
// })

// bot.on("interactionCreate", async (interaction) => {
//     if (interaction.isButton() && interaction.customId === 'button1') {

//         const userId = interaction.user.id;
//         const role = "942735451305947166";
//         const role2 = "1043147123132211252"

//         try {
//             if (interaction.member.roles.cache.has(role)) {
//                 interaction.reply({
//                     content: "Вы уже получили роль!\n\nДля того, чтобы получить все необходимые доступы к обучающему материалу — заполните форму: https://forms.gle/9i1Az1LQLuhPPyrb6",
//                     ephemeral: true
//                 })
//                 return;
//             }
//             interaction.member.roles.add(role)
//             interaction.reply({
//                 content: "Поздравляем, вы получили роль Member!\n\nДля того, чтобы получить все необходимые доступы к обучающему материалу — заполните форму: https://forms.gle/9i1Az1LQLuhPPyrb6",
//                 ephemeral: true
//             })
//         } catch (err) {
//             console.log(err)
//         }
//     }

//     if (interaction.isButton() && interaction.customId === 'button2') {

//         const userId = interaction.user.id;


//         try {

//             interaction.reply({
//                 content: "https://fondexx.pro/fndx-world/registration?refCode=001k",
//                 ephemeral: true
//             })
//         } catch (err) {
//             console.log(err)
//         }
//     }
// })

module.exports = bot;
