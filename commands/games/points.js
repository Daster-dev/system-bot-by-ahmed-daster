const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
        name: "points",
        cooldown: 5,
        aliases: ["games-points", "games-point"],
   	usage: "points [@user]",
   	category: "games",
    	description : "to show your points",
        run: async(client, message, args) => {

message.lineReplyNoMention(new MessageEmbed().setColor('#4ab2ef').setDescription(`✅   **<@!${message.author.id}> Points Is : \`${db.get(`points_${message.guild.id}_${message.author.id}.points`)}\`**`).setFooter(`Request By ${message.author.tag}`));

  }
};