const Discord = require("discord.js");

const fs = require("fs");
let config = require("./config.json");
const prefix = config.commandPrefix;
const bot = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS",] });
require('./src/handlers/commands').init(bot);
require('./src/handlers/events').init(bot);
require('dotenv').config()


bot.login(process.env.TOKEN);

bot.on("error", error => console.log(error))

bot.on("ready", () => {
    const button = new Discord.MessageButton().setCustomId('button2').setLabel("Зарегистрироваться").setStyle("SUCCESS");
    const buttons = new Discord.MessageActionRow();
    buttons.addComponents(button);
    // console.log(bot.channels.cache.get("1021866420839121008"))
    // bot.channels.cache.get("1042877911759327252").send({
    //     content: '**Рекомендую начинать с этого пакета (вне зависимости от вашего уровня в крипте)**\n\nПакет *EasyStart* для нашего комьюнити 👇\nПлатформа: Alpha Trader\nСтоимость платформы: 0$\nВремя работы счета: 3 календарных месяца\nМинимальный депозит: 250$\nДробные лоты: Доступны по дефолту\nКомиссия за 100 акций: 1$ (ЕСN Fees включены)\nBP (кредитное плечо): 1:30\nPayout: 100%\n\nДля того, чтобы зарегистрироваться и получить пониженные комиссии жмите кнопку 🔥',
    //     components: [buttons]
    // })
})
bot.on("messageCreate", function (message) {
    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandName = args.shift();
        const command = bot.commands.get(commandName);
        if (!command) return

        // if (command.admin && !message.member.roles.cache.has("995240388178751519")) return;
        command.run(bot, message, args);
    }
});


bot.on("interactionCreate", async (interaction) => {
    if (interaction.isButton() && interaction.customId === 'button1') {

        const userId = interaction.user.id;
        const role = "942735451305947166";
        const role2 = "1043147123132211252"

        try {
            if (interaction.member.roles.cache.has(role)) {
                interaction.reply({
                    content: "Вы уже получили роль!\n\nДля того, чтобы получить все необходимые доступы к обучающему материалу — заполните форму: https://forms.gle/9i1Az1LQLuhPPyrb6",
                    ephemeral: true
                })
                return;
            }
            interaction.member.roles.add(role)
            interaction.reply({
                content: "Поздравляем, вы получили роль Member!\n\nДля того, чтобы получить все необходимые доступы к обучающему материалу — заполните форму: https://forms.gle/9i1Az1LQLuhPPyrb6",
                ephemeral: true
            })
        } catch (err) {
            console.log(err)
        }
    }

    if (interaction.isButton() && interaction.customId === 'button2') {

        const userId = interaction.user.id;


        try {

            interaction.reply({
                content: "https://fondexx.pro/fndx-world/registration?refCode=001k",
                ephemeral: true
            })
        } catch (err) {
            console.log(err)
        }
    }
})

module.exports = bot;
