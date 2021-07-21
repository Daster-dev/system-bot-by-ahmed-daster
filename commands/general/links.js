const { MessageEmbed } = require("discord.js");
const db = require('quick.db');
const { MessageButton , MessageActionRow } = require(`discord-buttons`)
const { lineReply } = require("discord-reply");


module.exports = {
    name: "links",
    cooldown: 5,
    aliases: ["links "],
    description: "get bot's links",
    usage: "links",
    category: "general",
    run: async(client, message, args) => {

   let website = new MessageButton()
   .setStyle('url')
   .setURL(client.config.links.website || "https://discord.gg/BRzyjdUmW4")
   .setLabel("Website")
	
   let support = new MessageButton()
   .setStyle('url')
   .setURL(client.config.links.support || "https://discord.gg/BRzyjdUmW4")
   .setLabel("support server")

   let invite = new MessageButton()
   .setStyle('url')
   .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8589934591&scope=bot`)
   .setLabel("invite bot")

let component = new MessageActionRow()
.addComponents(support, website, invite)

let embed = new MessageEmbed()
.setTitle(client.user.username,client.user.avatarURL())
.setDescription("Our Links")
  message.lineReplyNoMention({
   embed : embed, 
   components : [component]
  })
    } 
    };