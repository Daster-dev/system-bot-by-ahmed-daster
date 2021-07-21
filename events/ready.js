const Discord = require("discord.js")
const chalk = require('chalk');
const figlet = require('figlet');
const db = require('quick.db');
module.exports = async(client) => {
const prefix = client.config.main.prefix;
    console.log(chalk.yellow(figlet.textSync(client.user.username, { horizontalLayout: 'full' })));
    console.log(chalk.green(`[${  client.user.tag}] started!
================================
> Users: ${client.users.cache.size}
> Channels: ${client.channels.cache.size}
> Servers: ${client.guilds.cache.size}
> Prefix: ${prefix}
> Id: ${client.user.id}
> Tag: #${client.user.discriminator}
================================
`))
    //client.user.setActivity(prefix + "help" );
    const activity = [
    `${prefix}help`,  
    client.config.bot.activity];
        let i = 0;
    setInterval(()=>{
        const index = Math.floor(i);
    client.user.setActivity(activity[index],{type: client.config.bot.type});
    i = i + 1;
    if(i === activity.length) i = i - activity.length;
    },5000)
    }