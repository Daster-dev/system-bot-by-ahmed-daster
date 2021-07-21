const { MessageEmbed } = require("discord.js");
const Discord = ("discord-reply");
const db = require('quick.db');
const { MessageButton , MessageActionRow } = require(`discord-buttons`)
const { lineReply } = require("discord-reply");


module.exports = {
    name: "unmute",
    cooldown: 5,
    aliases: ["unmute"],
    usage: "unmute [@user]",
    category: "admin",
    description : "to unmute some one",
    run: async(client, message) => {

    	var args = message.content.slice(prefix.length).trim().split(/ +/g);
        if(!message.member.hasPermission('MANAGE_ROLES')) return message.lineReplyNoMention(new MessageEmbed()
	    .setColor(client.build.err.color)
            .setDescription(client.build.err.emoji + "  **You Need `MANAGE_ROLES` Permission To Use This Command!**")
            .setFooter(`Request By ${message.author.tag}`)
	    .setTimestamp());
        var member = message.mentions.members.first()||message.guild.members.cache.get(args[1])||message.guild.members.cache.find(m => m.user.username === args.slice(1).join(' '));
        if(!member) return message.lineReplyNoMention(
		new MessageEmbed().setColor(client.build.err.color)
            .setDescription(client.build.err.emoji + "  **Please Mention/ID Same One!**")
            .setFooter(`Request By ${message.author.tag}`)
	    .setTimestamp())
                let muterole = message.guild.roles.cache.find(r => r.name === 'Muted')
        if(!member.roles.cache.has(muterole.id))return message.lineReplyNoMention(new MessageEmbed()
	    .setColor(client.build.err.color)
	    .setDescription(`${client.build.err.emoji} ${member.user.username} is not muted`))
        await member.roles.remove(muterole);
        message.lineReplyNoMention(new MessageEmbed()
	.setColor(client.build.done.color)
	.setDescription(`${client.build.done.emoji}  **${member.user.username} Has Ben Unmuted : By <@!${message.author.id}>**`)
	.setFooter(`Request By ${message.author.tag}`)
	.setTimestamp())
 
    }
};