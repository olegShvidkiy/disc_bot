

module.exports = {
    name: "interactionCreate",
    run: async (bot, interaction) => {

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
    }
}