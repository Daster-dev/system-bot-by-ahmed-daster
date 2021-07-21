const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');




module.exports = {
    name: "warnings",
    cooldown: 5,
    aliases: ["all-warns"],
    usage: "warnings [@user]",
    category: "admin",
    description : "to show user warns ",
    run: async(client, message, args) => {
     var user = message.mentions.members.first() 
    var author = message.author;
    if(!user) user = author

  var res = db.fetch(`userwarn_${message.guild.id}_${user.id}`)
  var rr = await db.fetchAll(`reason_${message.guild.id}_${user.id}`, res)

if(res === null) res = 0
 
message.lineReplyNoMention(new MessageEmbed().setColor(client.build.done.color).setDescription(`**${user} Have ${res} Warnings**`).setFooter(`Request By ${message.author.tag}`));
    }
};