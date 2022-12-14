const express = require("express");
const Discord = require("discord.js");
const app = express();
const port = process.env.PORT || 4000;
const cors = require('cors');
const bodyParser = require('body-parser');
const bot = require("./bot");
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => console.log("hello"));

app.post("/reg", (req, res) => {
    console.log(req.body);
    const newReg = new Discord.MessageEmbed()
        .setColor("#7FFF00")
        .setTitle("Новая заявка на регистрацию!");
    
    let description = "";

    for(field in req.body){
        description += `***${field}*** : ${req.body[field]} \n`;
    };

    newReg.setDescription(description);
    
    bot.guilds.cache.get(config.serverID).channels.cache.get(config.adminChannel).send({ embeds: [newReg]})
    res.send("ok"); 
})

app.listen(port, ()=>{
    console.log("working...")
})



