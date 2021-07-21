const { MessageEmbed } = require("discord.js");
const Discord = ("discord-reply");
const db = require('quick.db');
const { MessageButton , MessageActionRow } = require(`discord-buttons`)
const { lineReply } = require("discord-reply");

module.exports = {
    name: "unblacklist",
    cooldown: 5,
    aliases: ["un-black-list"],
    description: '',
    usage: "unblacklist [@user]",
    category: "owners",
    run: async(client, message, args) => {
	if(!client.config.devlopers.id.includes(message.author.id)) return;
	var user = message.mentions.users.first() || client.users.cache.get(message.content.split(" ").slice(1));
	if(!user)return message.lineReplyNoMention(new MessageEmbed()
	.setColor(client.build.err.color)
	.setTitle(client.build.err.emoji)
	.setDescription(`${client.build.err.emoji} Please mentions some one / id`));
	if(db.get(`blacklist_${user.id}`) == "off")return message.lineReplyNoMention(new MessageEmbed()
	.setColor(client.build.err.color)
	.setTitle(client.build.err.emoji)
	.setDescription(`${client.build.err.emoji} This user is not blacklist`))
	db.set(`blacklist_${user.id}`, "off")
	message.lineReplyNoMention(new MessageEmbed()
	.setColor(client.build.done.color)
	.setTitle(client.build.done.emoji)
	.setDescription(`${client.build.done.emoji} Done Unblack list <@${user.id}>`))
    }
};