const { Message, Client, MessageEmbed } = require('discord.js')
const { lineReply } = require("discord-reply");
const db = require("quick.db")


module.exports = {
    name: "ping",
    aliases: ["latancy"],
    description: "get bot latancy",
    usage: "ping",
    category: "general",
    run: async(client, message, args) => {
var states = "🟢 Excellent";
    var states2 = "🟢 Excellent";
    var m = message;
    var msg = `${Date.now() - m.createdTimestamp}`;
    var api = `${Math.round(client.ws.ping)}`;
    if (Number(msg) > 70) states = "🟢 Good";
    if (Number(msg) > 170) states = "🟡 Not Bad";
    if (Number(msg) > 350) states = "🔴 Soo Bad";
    if (Number(api) > 70) states2 = "🟢 Good";
    if (Number(api) > 170) states2 = "🟡 Not Bad";
    if (Number(api) > 350) states2 = "🔴 Soo Bad";
    if (m.author.bot) return;
    
var embed = new MessageEmbed()
        .setColor("00e8ff")
        .setAuthor(m.author.username, m.author.avatarURL())
        .addField("**Time Taken:**", msg + " ms 📶 | " + states, true)
        .addField("**WebSocket:**", api + " ms 📶 | " + states2, true)
        .setTimestamp()
        .setFooter(`Request By ${m.author.tag}`);
        m.lineReplyNoMention(embed)
    }
}