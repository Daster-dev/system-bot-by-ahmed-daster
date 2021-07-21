
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
    name: "new",
    cooldown: 5,
    aliases: ["open"],
    description: 'open new Ticket',
    usage: "new",
    category: "ticket",
    run: async(client, message, args) => {
	let tchannels = [];
	let current = 0;
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
      return message.lineReplyNoMention(
        `**الـبـوت غـيـر قـادر عـلـي صـنـع روم تـحقق مـن الـرتـبـة**`
      );
    console.log(current);
    let openReason = "";
    current++;
    message.guild.channels.create(`ticket-${message.author.id}`, "text").then(c => {
      tchannels.push(c.id);
      message.lineReplyNoMention(`**تـم فـتـح تـذكرتـك**`);
      c.createOverwrite(message.guild.id, {
        VIEW_CHANNEL: false,
        SEND_MESSAGES: false
      });
      c.createOverwrite(message.author.id, {
        VIEW_CHANNEL: true,
        SEND_MESSAGES: true
      });
 
      if (args[1])
        openReason = `\nReason: [ **__${args.slice(1).join(" ")}__** ]`;
      let embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL())
        .setColor("#36393e")
        .setDescription(`**Wait Admin To Answer You**${openReason}`);
      c.send(`${message.author}`);
      c.send(embed);
    });
    }
};