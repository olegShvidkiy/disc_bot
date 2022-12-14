

module.exports = {
    name: "messageCreate",
    once: false,
    run: async (bot, message) => {

        if (message.content.startsWith(Config.commandPrefix)) {
            const args = message.content.slice(Config.commandPrefix.length).trim().split(/ +/g);
            const commandName = args.shift();
            const command = bot.commands.get(commandName);
            if (!command) return

            // if (command.admin && !message.member.roles.cache.has("995240388178751519")) return;
            command.run(bot, message, args);
        }
    }
}