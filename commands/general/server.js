const { MessageEmbed } = require("discord.js");
const db = require('quick.db');
const { lineReply } = require("discord-reply");


module.exports = {
        name: "server",
        cooldown: 5,
        aliases: ["s"],
	description: "get info about server",
	usage: "server",
     	category: "general",
        run: async(client, message, args) => {

 var prefix = await db.fetch(`prefix_${message.guild.id}`);
   	let roles = message.guild.roles.cache.size
    	const text = message.guild.channels.cache.filter(r => r.type === "text").size
        const voice = message.guild.channels.cache.filter(r => r.type === "voice").size
        const chs = message.guild.channels.cache.size

        var embed = new MessageEmbed()
    	.setColor('#4ab2ef')
    	.setTitle(`**${message.guild.name}**`)
        .addField(`**Server id 🆔**`, `${message.guild.id}`, true)
        .addField(`**Created On 📆**`, `\`${message.guild.createdAt.toLocaleString()}\``, true)
        .addField(`**Owned By 👑**`, `${message.guild.owner}`, true)
        .addField(`**Members 👥 (${message.guild.memberCount})**`, `ㅤ`, true)
        .addField(`**Channels 💬 (${chs})**`, `** [ Text ${text} ] |  [ Voice ${voice} ] **`, true)
        .addField(`🌍 Others`, `**Region:** ${message.guild.region}`, true) 
        .addField(`:closed_lock_with_key:  Roles (${roles})`, `To see a list with all roles use \`${prefix || client.config.main_prefix}roles\``, true) 
        .setFooter(`Requested by: ${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp();
	message.lineReplyNoMention(embed)
    }
};