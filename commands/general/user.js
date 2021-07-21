const { MessageEmbed } = require("discord.js");
const db = require('quick.db');
const { MessageButton , MessageActionRow } = require(`discord-buttons`)
const moment = require("moment")
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
    name: "user",
    cooldown: 5,
    aliases: ["user"],
    description:"get info about you",
    usage: "user [@user]",
    category: "general",
    run: async(client, message, args) => {
	var user = message.mentions.users.first() || message.author;
 var embed = new MessageEmbed()
.setAuthor(user.tag, user.avatarURL({dynamic : true, size : 1024 }))
.addField("Name",user.tag)
.addField("id",user.id)
.addField("avatar", `[avatar URL](${user.avatarURL({dynamic : true})})`)
  .addField('**Joined Discord :**', ` \`${moment(user.createdTimestamp).format('DD/MM/YYYY h:mm')}\` \n > **${moment(user.createdTimestamp).fromNow()}**`)
  message.lineReplyNoMention(embed)
    }
};