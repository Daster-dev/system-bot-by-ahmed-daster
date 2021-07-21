require("./server/express");
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const { Collection } = require('discord.js');
const chalk = require('chalk');
const figlet = require('figlet');
const db = require("quick.db")
const {prefix, bot_token} = require('./config/bot.json');
const { MessageButton , MessageActionRow } = require(`discord-buttons`)
require('discord-buttons')(client);
client.config = require('./config/bot.json');
client.build = require("./config/build.json");
client.commands = new Discord.Collection();

fs.readdir('./events/', (err, files) => {
    if (err) return console.log(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split('.')[0];
console.log(chalk.blue.bold("Loading api event ") + chalk.magenta.bold(`"${eventName}"`));
	client.on(eventName, event.bind(null, client));
    });
});

fs.readdir("./commands/", (err, categories, message) => {
    if (err) console.log(err)
    console.log(`Found total ${categories.length} categories.`)

    categories.forEach(category => {
          let categoryName = category.split('.')[0];
      console.log(`Loading ${categoryName}.js!`);
fs.readdir(`./commands/${category}`, (error,files) => {
  if (error) { return console.log("error i can not find commands"); };
  files.filter(file=>file.endsWith(".js")).forEach(file => {
    const command = require(`./commands/${category}/${file}`);
console.log(chalk.blue.bold("Loading command ") + chalk.red.bold(`"${command.name}"`));
    client.commands.set(command.name, command);
        
})
 })
})
})


 

client.on('message', async message =>{
	if(message.content.startsWith(`<@${client.user.id}>`) || 
	   message.content.startsWith(`<@!${client.user.id}>`)) {
	var prefix = await db.fetch(`prefix_${message.guild.id}`);
        if (prefix == null || !prefix || undefined) prefix = client.config.main.prefix;
let embed = new Discord.MessageEmbed()
.setTitle(client.user.username)
.setDescription(`
> Server Prefix: ${prefix}
> Commands: ${prefix}help`)
.setThumbnail(client.user.avatarURL())
var u = new MessageButton()
.setStyle(`url`)
.setLabel(`Website`)
.setURL(`${client.config.links.website}`)
 var u2 = new MessageButton()
.setStyle(`url`)
.setLabel(`Support`)
.setURL(`${client.config.links.support}`)
var u3 = new MessageButton()
.setStyle(`url`)
.setLabel(`Invite`)
.setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8589934591&scope=bot`)
var row = new MessageActionRow()
.addComponent([u])
.addComponent([u2])
.addComponent([u3])
message.lineReplyNoMention({components: [row], embed: embed})
if(client.config.projectlink == "true"){
message.author.send("لصنع مثل هذا البوت ")
} else if(client.config.projectlink == "false"){
	return;
}else {
	console.log("err not fuond")
}

	}
});

 



client.login(client.config.connection.token || process.env.token);