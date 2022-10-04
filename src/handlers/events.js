const fs = require("fs");

module.exports.init = (bot)=>{
    const events = fs.readdirSync("src/events").filter( file =>file.endsWith(".js"));
    events.forEach( file=>{
        const eventName = file.substr(0, file.indexOf("."));
        const event = require(`../events/${eventName}`);
        bot.on(eventName, (...args) => event.run(...args));
    });
        
}
