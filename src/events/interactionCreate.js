const Discord = require("discord.js");
const { ActionRowBuilder, ButtonBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ButtonStyle } = require('discord.js');
module.exports = {
    name: "interactionCreate",
    run: async (bot, interaction) => {
        console.log(interaction)

        if (interaction.isButton()) {
            const userId = interaction.user.id;
            switch (interaction.customId) {
                case 'button1':
                    button1Click(interaction);
                    break;
                case 'button2':
                    button2Click(interaction);
                    break;
                case 'start':
                    startClick(interaction);
                    break;
                case 'check':
                    checkClick(interaction);
                    break;

            }
        }


    }
}

function button1Click(interaction) {

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

function button2Click(interaction) {
    try {
        interaction.reply({
            content: "https://fondexx.pro/fndx-world/registration?refCode=001k",
            ephemeral: true
        })
    } catch (err) {
        console.log(err)
    }
}

async function startClick(interaction) {

    const check = new ButtonBuilder().setCustomId('check').setLabel("Проверить оплату").setStyle(ButtonStyle.Success);
    const stop = new ButtonBuilder().setCustomId('stop').setLabel("Отменить оплату").setStyle(ButtonStyle.Danger);

    const buttons = new ActionRowBuilder();
    buttons.addComponents(check);
    buttons.addComponents(stop)
    try {
        interaction.reply({
            content: "Реквизиты для оплаты: *реквизиты*\nНужная сумма: 19.023412",
            components: [buttons],
            ephemeral: true
        })
    } catch (err) {
        console.log(err)
    }
}

async function checkClick(interaction) {
    const modal = new ModalBuilder()
        .setCustomId('myModal')
        .setTitle('My Modal');

    // Add components to modal

    // Create the text input components
    const favoriteColorInput = new TextInputBuilder()
        .setCustomId('favoriteColorInput')
        // The label is the prompt the user sees for this input
        .setLabel("What's your favorite color?")
        // Short means only a single line of text
        .setStyle(TextInputStyle.Short);

    const hobbiesInput = new TextInputBuilder()
        .setCustomId('hobbiesInput')
        .setLabel("What's some of your favorite hobbies?")
        // Paragraph means multiple lines of text.
        .setStyle(TextInputStyle.Paragraph);

    // An action row only holds one text input,
    // so you need one action row per text input.
    const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
    const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);

    // Add inputs to the modal
    modal.addComponents(firstActionRow, secondActionRow);

    // Show the modal to the user
    await interaction.showModal(modal);

}