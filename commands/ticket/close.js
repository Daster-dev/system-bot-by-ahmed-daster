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
    name: "close",
    cooldown: 5,
    aliases: ["close"],
    usage: "close",
    category: "ticket",
    description : "close the ticket",
    run: async(client, message, args) => {
	let tchannels = [];
	    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.lineReplyNoMention(
      `**انـت لـسـت مـن ادارة الـسـيـرفـر لـتـنـفـيذ هذا الأمـر`
      );
    if (
      !message.channel.name.startsWith("ticket-") &&
      !tchannels.includes(message.channel.id)
    )
      return message.lineReplyNoMention(`**هـذا لـيـس روم تـيـكـيـت**`);
 
    message.lineReplyNoMention(
      `**جـاري قـفـل الـروم تـلـقـائـيـا بـعـد 5 ثـوانـي**`
    );
    tchannels.splice(tchannels.indexOf(message.channel.id), 1);
    setTimeout(() => message.channel.delete(), 5000); //
    }
};