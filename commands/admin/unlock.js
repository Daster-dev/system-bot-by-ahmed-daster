const { MessageEmbed } = require("discord.js");
const db = require('quick.db');
const { MessageButton , MessageActionRow } = require(`discord-buttons`)
const { lineReply } = require("discord-reply");


module.exports = {
    name: "unlock",
    cooldown: 5,
    aliases: ["unlock"],
    usage: "unlock [#channel]",
    category: "admin",
    description : "everyone can send messages",
    run: async(client, message, args) => {

	if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.lineReplyNoMention(new MessageEmbed()
	.setColor(client.build.err.color)
	.setDescription(client.build.err.emoji + "  **You Need `MANAGE_CHANNELS` Permission To Use This Command!**")
	.setFooter(`${message.author.tag}`, message.author.avatarURL()))

        let channel = message.mentions.channels.first();
        let channel_find = message.guild.channels.cache.find(ch => ch.id == channel);
        if (!channel) channel_find = message.channel;
        if (!channel_find) return;
        channel_find.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: true
        });
      message.lineReplyNoMention(new MessageEmbed()
      .setColor(client.build.done.color)
      .setDescription("✅ **Channel has been unlocked.**")
      .setFooter(`${message.author.tag}`, message.author.avatarURL()))
    }
};