const { MessageEmbed } = require("discord.js");
const Discord = ("discord-reply");
const db = require('quick.db');
const { MessageButton , MessageActionRow } = require(`discord-buttons`)
const { lineReply } = require("discord-reply");
/*
client.build.done.color
client.build.done.emoji

client.build.warn.color
client.build.warn.emoji

client.build.err.color
client.build.err.emoji
 */

module.exports = {
    name: "blacklist",
    cooldown: 5,
    aliases: ["black-list"],
    description: '',
    usage: "blacklist [@user]",
    category: "owners",
    run: async(client, message, args) => {
	if(!client.config.devlopers.id.includes(message.author.id)) return;
	var user = message.mentions.users.first() || client.users.cache.get(message.content.split(" ").slice(1));
	if(!user)return message.lineReplyNoMention(new MessageEmbed()
	.setColor(client.build.err.color)
	.setTitle(client.build.err.emoji)
	.setDescription(`${client.build.err.emoji} Please mentions some one / id`));
	if(user.id == client.user.id || user.id == message.author.id)return message.lineReplyNoMention(new MessageEmbed()
	.setColor(client.build.err.color)
	.setDescription("WTF Are You Doning"))
	if(db.get(`blacklist_${user.id}`) == "on")return message.lineReplyNoMention(new MessageEmbed()
	.setColor(client.build.err.color)
	.setTitle(client.build.err.emoji)
	.setDescription(`${client.build.err.emoji} This user is alredy blacklisted`))
	db.set(`blacklist_${user.id}`, "on")
	message.lineReplyNoMention(new MessageEmbed()
	.setColor(client.build.done.color)
	.setTitle(client.build.done.emoji)
	.setDescription(`${client.build.done.emoji} Done black list <@${user.id}>`))
    }
};