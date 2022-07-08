const Discord = require("discord.js");
const fs = require("fs");

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const {SlashCommandBuilder} = require("@discordjs/builders");
const bot = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS" ]});
let config = require("./config.json");
const { off, env } = require("process");
bot.login(config.token);

const prefix = config.commandPrefix;

bot.commands = new Discord.Collection();
const commands = fs.readdirSync("./commands").filter( file =>file.endsWith(".js"));

const events = fs.readdirSync("./events").filter( file =>file.endsWith(".js"));


commands.forEach( file => {
    const commandName = file.substr(0, file.indexOf("."));
    const command = require(`./commands/${commandName}`);
    bot.commands.set(commandName, command);
});

events.forEach( file=>{
    const eventName = file.substr(0, file.indexOf("."));
    const event = require(`./events/${eventName}`);
    bot.on(eventName, (...args) => event.run(...args));
})
    

bot.on("messageCreate", function(message) {
    if(message.content.startsWith(prefix)){
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandName = args.shift();
        const command = bot.commands.get(commandName);
        if(!command) return

        command.run(bot, message, args);
    }   
});



const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const cors = require('cors');
app.use(cors());

app.get("/", (req, res) => console.log("hello"));

app.post("/reg", (req, res) => {
    if(!request.body) return response.sendStatus(400);
    console.log(req.body);
    res.send("ok")
})

app.listen(port, ()=>{
    console.log("working...")
})
