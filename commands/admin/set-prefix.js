const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const { lineReply} = require("discord-reply")
module.exports = {
    name: "set-prefix",
    cooldown: 5,
    aliases: ["prefix"],
    usage: "set-prefix [new prefix]",
    category: "config",
    description : "To setup new prefix for server",
    run: async(client, message) => {

        if (!message.guild || message.author.bot) return;
        var args = message.content.toLowerCase().split(' ');
 

if(!message.member.hasPermission('ADMINISTRATOR')) return message.lineReplyNoMention(new MessageEmbed().setColor('#ff0004').setDescription("❌  **You Need `ADMINISTRATOR` Permission To Use This Command!**").setFooter(`Request By ${message.author.tag}`)) ;
        if (!args[1]) {
message.lineReplyNoMention(new MessageEmbed().setColor('#ff0004').setDescription("❌  **Type The Prefix**").setFooter(`Request By ${message.author.tag}`));
return;
}
await db.set(`prefix_${message.guild.id}`, args[1]);
message.lineReplyNoMention(new MessageEmbed().setColor('#4ab2ef').setDescription(`✅   **Done , New Prefix Is \`${args[1]}\`**`).setFooter(`Request By ${message.author.tag}`));
    }
};