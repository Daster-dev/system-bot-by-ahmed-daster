
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
    name: "add",
    cooldown: 5,
    aliases: ["add"],
    usage: "add [@user]",
    category: "ticket",
    description : "add Some one to ticket channel",
    run: async(client, message, args) => {
	    if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS"))
      return message.lineReplyNoMention(
        `**Error** \nI Don\'t have MANAGE_CHANNELS Permission to do this`
      );
    if (!message.channel.name.startsWith("ticket-"))
      return message.lineReplyNoMention(`**This command only for the tickets**`);
    let member = message.mentions.members.first();
    if (!member) return message.lineReplyNoMention(`**Please mention the user**`);
    if (
      message.channel
        .permissionsFor(member)
        .has(["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"])
    )
      return message.lineReplyNoMention(
        `this member already in this ticket :rolling_eyes:`
      );
    message.channel.createOverwrite(member.id, {
      SEND_MESSAGES: true,
      VIEW_CHANNEL: true,
      READ_MESSAGE_HISTORY: true
    });
    message.lineReplyNoMention(`**Done \nSuccessfully added <@${member.user.id}> to the ticket**`);
    }
};