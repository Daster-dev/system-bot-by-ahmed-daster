const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');




module.exports = {
    name: "unban",
    cooldown: 5,
    aliases: ["unban"],
    usage: "unban [user id]",
    category: "admin",
    description : "To unban puople form server",
    run: async(client, message, args) => {

	if(!message.member.hasPermission('BAN_MEMBERS')) return message.lineReplyNoMention(new MessageEmbed().setColor(client.build.err.color).setDescription(client.build.err.emoji + "  **You Need `BAN_MEMBERS` Permission To Use This Command!**").setFooter(`Request By ${message.author.tag}`)) 
        let member = message.mentions.users.first() || client.users.cache.get(message.content.split(' ')[1])
        var user = message.guild.member(member)
        if (!user) return message.lineReplyNoMention(
	new MessageEmbed()
	    .setColor(client.build.err.color)
            .setDescription(client.build.err.emoji + "  **Please Mention/ID Same One!**")
            .setFooter(`Request By ${message.author.tag}`).setTimestamp())
        if (user.id === message.author.id) return message.reply(
	new MessageEmbed()
	    .setColor(client.build.err.color)
	    .setDescription(client.build.err.emoji + "  **WTF Are You Doing ??**")
            .setFooter(`Request By ${message.author.tag}`).setTimestamp())
        if (user.id === client.user.id) return message.lineReplyNoMention(
	new MessageEmbed()
	    .setColor(client.build.err.color)
            .setDescription(client.build.err.emoji + "  **WTF Are You Doing ??**")
            .setFooter(`Request By ${message.author.tag}`).setTimestamp())
	
        message.guild.unban(user).then(() => {
message.lineReplyNoMention(new MessageEmbed()
.setColor(client.build.done.color)
.setDescription(`${client.build.done.emoji}  **${user} unbanned from the server ! 👋 by:<@${message.author.id}>**`)
.setFooter(`Request By ${message.author.tag}`));
        })
    }
};