const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')
const db = require('quick.db');
const { parse } = require('twemoji-parser');
const chalk = require('chalk');



module.exports = {
        name: "add-emoji",
        cooldown: 5,
        aliases: ["add-emoji"],
	usage: "add-emoji [emoji] [name]",
  	category: "admin",
	description : "Add Emoji From Author servers to Your server",
        run: async(client, message) => {

                var prefix = await db.fetch(`prefix_${message.guild.id}`);
                if (prefix == null) prefix = client.config.main_prefix;
		var lang = db.get(`${message.guild.id}.lang`);
		if (lang == null || undefined) db.set(`${message.guild.id}`, { lang: "ar" });
                const args = message.content.split(' ').slice(1)
if(!message.member.hasPermission('MANAGE_EMOJIS')) return message.lineReplyNoMention(new MessageEmbed().setColor(client.build.err.color).setDescription(client.build.err.emoji + "  **You Need `MANAGE_EMOJIS` Permission To Use This Command!**").setFooter(`Request By ${message.author.tag}`)) 

        const emoji = args.join("");
if(!emoji) return message.lineReplyNoMention(new MessageEmbed().setColor(client.build.err.color).setDescription(client.build.err.emoji + "  **Type The Emoji!**").setFooter(`Request By ${message.author.tag}`)) 


                let customemoji = Discord.Util.parseEmoji(emoji);
                if (customemoji.id) {
                    const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
            customemoji.animated ? 'gif' : 'png'
        }`;
                    const name = args.slice(1).join(' ');
                    message.guild.emojis.create(`${Link}`, `${name || `${customemoji.name}`}`);


message.lineReplyNoMention(new MessageEmbed().setColor(client.build.done.color).setDescription(`${client.build.done.emoji}   **Done Added ${name || `${customemoji.name}`} Emoji In Your Server**`).setFooter(`Request By ${message.author.tag}`));

    } else {

let CheckEmoji = parse(emoji, { assetType: 'png' });
if(!CheckEmoji[0]) return message.lineReplyNoMention(new MessageEmbed().setColor(client.build.err.color).setDescription(client.build.err.emoji + "  **Bad Reading**").setFooter(`Request By ${message.author.tag}`)) 

message.lineReplyNoMention(new MessageEmbed().setColor(client.build.err.color).setDescription(`${client.build.err.emoji} **| Bad Reading**`));
}
    }
};