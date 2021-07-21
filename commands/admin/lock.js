const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")
const { lineReply } = require("discord-reply")
const db = require('quick.db');
const { MessageButton , MessageActionRow } = require
 ("discord-buttons")
 
 


module.exports = {
    name: "lock",
    cooldown: 5,
    aliases: ["lock"],
    usage: "lock [#channel]",
    category: "admin",
    description : "make everyone can't send messages is chat",
    run: async(client, message, args) => {

if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.lineReplyNoMention(
new MessageEmbed()
.setColor(client.build.err.color)
.setDescription(client.build.err.emoji + "  **You Need `MANAGE_CHANNELS` Permission To Use This Command!**")
.setFooter(`${message.author.tag}`, message.author.avatarURL()))
        let channel = message.mentions.channels.first();
        let channel_find = message.guild.channels.cache.find(ch => ch.id == channel);
        if (!channel) channel_find = message.channel
        if (!channel_find) return;
        channel_find.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: false
        });
        message.lineReplyNoMention(new MessageEmbed()
	    .setColor(client.build.done.color)
	    .setDescription(":lock: **has been locked.**")
	    .setFooter(`${message.author.tag}`, message.author.avatarURL()))
 
	
    }
};