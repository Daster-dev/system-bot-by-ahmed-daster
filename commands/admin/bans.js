const { MessageEmbed } = require("discord.js");
const db = require('quick.db');
const { MessageButton , MessageActionRow } = require(`discord-buttons`)
const { lineReply } = require("discord-reply");


module.exports = {
    name: "bans",
    cooldown: 5,
    aliases: ["bans"],
    usage: "bans",
    category: "admin",
    description : "To show all server bans",
    run: async(client, message, args) => {
	if(!message.member.hasPermission("ADMINISTRATOR")) return message.lineReplyNoMention(new MessageEmbed()
	.setColor(client.build.err.color)
	.setDescription(client.build.err.emoji + "  **You Need `ADMINISTRATOR` Permission To Use This Command!**")
	.setFooter(`${message.author.tag}`, message.author.avatarURL()))
if (!message.channel.guild) return;
		message.channel;
		message.guild.fetchBans().then(bans =>
message.lineReplyNoMention (new MessageEmbed()
.setAuthor(message.guild.name, message.guild.iconURL())
.setColor(client.build.done.color)
.setDescription(`**${message.guild.name}** ban list is \`${bans.size}\``)
.setFooter(`${message.author.tag}`, message.author.avatarURL()))).catch(console.error);
    }
};