const { Client, Collection, MessageEmbed, splitMessage, escapeMarkdown,MessageAttachment } = require("discord.js");
var { MessageButton , MessageActionRow } = require(`discord-buttons`)
const { lineReply } = require("discord-reply");
const db = require('quick.db');
const chalk = require('chalk');

module.exports = {
        name: "avatar",
	cooldown: 5,
        aliases: ["a"],
	description : "get your avatar / server icon",
	usage: "avatar [@user / 'server']",
     	category: "general",
       run: async(client, message, args) => {

	if (args[0] === 'server') {
            const savatar = message.guild.iconURL()
            const embed2 = new MessageEmbed()
                .setTitle(`${message.guild.name} avatar`)
                .setColor(client.build.done.color)
                .setImage(savatar)
	    var u = new MessageButton()
.setStyle(`url`)
.setLabel(`Download Avatar`)
.setURL(`${message.guild.iconURL({dynamic : true, size : 1024})}`)
var row = new MessageActionRow()
.addComponent([u])
message.lineReplyNoMention({components: [row], embed: embed2})
        }
var user = message.mentions.users.first()|| client.users.cache.get(message.content.split(' ')[1]) || message.author;
var embed = new MessageEmbed()
.setAuthor(user.username,user.avatarURL())
.setImage(user.avatarURL({dynamic : true, size : 1024}))
.setColor(client.build.done.color)
var u = new MessageButton()
.setStyle(`url`)
.setLabel(`Download Avatar`)
.setURL(`${user.displayAvatarURL({dynamic : true, size : 1024})}`)
var row = new MessageActionRow()
.addComponent([u])
message.lineReplyNoMention({components: [row], embed: embed})
    }
}
