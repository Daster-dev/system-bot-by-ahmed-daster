const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');




module.exports = {
    name: "remove-warn",
    cooldown: 5,
    aliases: ["rwarn"],
    usage: "remove-warn [user] [num of warn]",
    category: "admin",
    description : "remove all warns form some one",
    run: async(client, message, args) => {
var user = message.mentions.members.first()
if(!user) return message.lineReplyNoMention(new MessageEmbed().setColor(client.build.err.color).setDescription(client.build.err.emoji + "  **Mention A User**").setFooter(`Request By ${message.author.tag}`)) 

    db.delete(`userwarn_${message.guild.id}_${user.id}`)

message.lineReplyNoMention(new MessageEmbed().setColor(client.build.done.color).setDescription(`${client.build.done.emoji}   **Done , ${user} Warns Has Been Deleted **`).setFooter(`Request By ${message.author.tag}`));

    }
};