
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
    name: "remove",
    cooldown: 5,
    aliases: ["remove"],
    description: 'remove some one from ticket',
    usage: "remove [@user]",
    category: "ticket",
    run: async(client, message, args) => {
	    if (!message.channel.name.startsWith("ticket-")) {
      return message.lineReplyNoMention(`**This command only for the tickets**`);
    }
    let member = message.mentions.members.first();
    if (!member || member.id === client.user.id) {
      return message.lineReplyNoMention(`**Please mention the user**`);
    }
    if (
      !message.channel
        .permissionsFor(member)
        .has(["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"])
    ) {
      return message.lineReplyNoMention(
        `**${member.user.tag}** is not in this ticket to remove them`
      );
    }
    message.channel.createOverwrite(member.id, {
      SEND_MESSAGES: false,
      VIEW_CHANNEL: false,
      READ_MESSAGE_HISTORY: false
    });
    message.lineReplyNoMention(`**Done \nSuccessfully removed \`${member.user.tag}\` from the ticket**`);
    }
};