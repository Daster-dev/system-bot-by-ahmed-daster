const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');




module.exports = {
    name: "warn",
    cooldown: 5,
    aliases: ["تحذير"],
    usage: "warn [@user] [reason]",
    category: "admin",
    description : "to warn some one",
    run: async(client, message, args) => {
if(!message.member.hasPermission('ADMINISTRATOR')) return message.lineReplyNoMention(new MessageEmbed().setColor(client.build.err.color).setDescription(client.build.err.emoji + "  **You Need `ADMINISTRATOR` Permission To Use This Command!**").setFooter(`Request By ${message.author.tag}`)) 

  var user = message.mentions.members.first();
 var reason = message.content.split(' ').slice(2).join(" ");
if(!user) message.lineReplyNoMention(new MessageEmbed().setColor(client.build.err.color).setDescription(client.build.err.emoji + "  **Mention A User**").setFooter(`Request By ${message.author.tag}`)) 

if(!reason) return message.lineReplyNoMention(new MessageEmbed().setColor(client.build.err.color).setDescription(client.build.err.emoji + "  **Type A Reason**").setFooter(`Request By ${message.author.tag}`)) 

 

message.lineReplyNoMention(new MessageEmbed().setColor(client.build.done.color).setDescription(`${client.build.done.emoji}    **Done , ${user} Has Been Warned**`).setFooter(`Request By ${message.author.tag}`)).then(() => {
db.set(`userwarn_${message.guild.id}_${user.id}` , 1)
db.set(`reason_${message.guild.id}_${user.id}`, reason)
user.send(new MessageEmbed().setTitle(`:warning: You were warned!`)
.setDescription(reason)
.setFooter(`${message.guild.name}`)
.setTimestamp())
  })
    }
};