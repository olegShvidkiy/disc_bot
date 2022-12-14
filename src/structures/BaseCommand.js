
const { Client, ApplicationCommandType, Message, BaseInteraction, AutocompleteInteraction } = require('discord.js');

class BaseCommand {
    //основные
    name = "commandName";
    bot_permissins = [];
    description = "Description"
    //дополнительные
    user_permissions = [];
    options = [];
    slash = {
        name: this.name,
        usage: this.description,
        type: ApplicationCommandType.ChatInput,
        options: this.options
    };
    context = {
        name: this.name,
        type: ApplicationCommandType.Message,
    };
    componentNames = []

    constructor() { }

    /**
     * Вызов слушателя команды
     * @param  {Client} client Экземпляр Client
     * @param  {(Message|BaseInteraction)} command Поставляемый объект сообщения или интеракции
     */


}
