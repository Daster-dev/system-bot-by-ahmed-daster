const { MessageEmbed } = require("discord.js");
const db = require('quick.db');
const { MessageButton , MessageActionRow } = require(`discord-buttons`)
const { lineReply } = require("discord-reply");

module.exports = {
        name: "bot",//Command
        cooldown: 5,//cooldown in seconds
        aliases: ["bot"],//Shortcuts,aliases You can add whatever you want
        description: "info about bot",
   	usage: "bot",
     	category: "general",
    run: async(client, message, args) => {

var embed = new MessageEmbed()
 .setColor(client.build.done.color)
 .setThumbnail(`${client.user.displayAvatarURL({ dynamic: true, size: 512 })}`)
 .addField(`**Libray**`, `**\`Discord.js\`**`, true)
 .addField(`**${client.user.username} id**`, `**\`${client.user.id}\`**`, true)
 .addField(`**Developers**`, `<@756977363673415832>
 
  <@756991528869560381>`, true)
 .addField(`**User Cuont:**`, `**\`${client.users.cache.size}\`**`, true)
 .addField(`**Servers Cuont:**`, `**\`${client.guilds.cache.size}\`**`, true)
 .addField(`**channels Cuont**:`, `**\`${client.channels.cache.size}\`**`, true)
 .setFooter(`Requested by: ${message.author.username}#${message.author.discriminator} - ping: ${client.ws.ping}`, message.member.user.displayAvatarURL({ dynamic: true }))
 var u = new MessageButton()
.setStyle(`url`)
.setLabel(`Website`)
.setURL(`${client.config.links.website}`)
 var u2 = new MessageButton()
.setStyle(`url`)
.setLabel(`Support`)
.setURL(`${client.config.links.support}`)
var u3 = new MessageButton()
.setStyle(`url`)
.setLabel(`Invite`)
.setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8589934591&scope=bot`)
var row = new MessageActionRow()
.addComponent([u])
.addComponent([u2])
.addComponent([u3])
message.lineReplyNoMention({components: [row], embed: embed})


    }
}; 