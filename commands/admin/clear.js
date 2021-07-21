const { MessageEmbed } = require("discord.js");
const db = require('quick.db');
const { MessageButton , MessageActionRow } = require(`discord-buttons`)
const { lineReply } = require("discord-reply");


module.exports = {
    name: "clear",
    cooldown: 5,
    aliases: ["clear"],
    usage: "clear [message number]",
    category: "admin",
   description : "to clear the chat form messages",
    run: async(client, message, args) => {
		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.lineReplyNoMention(new MessageEmbed().setColor(client.build.err.color).setDescription(client.build.err.emoji + "  **You Need `MANAGE_MESSAGES` Permission To Use This Command!**").setFooter(`${message.author.tag}`, message.author.avatarURL()))
 
		 message.content.split(' ').slice(1);
		let messagecount = parseInt(args);
		if (args > 100)
			return message.lineReplyNoMention(`\`\`\`javascript
i cant delete more than 100 messages 
\`\`\``).then(messages => messages.delete(5000));
		if (!messagecount) messagecount = '100';
		message.channel.messages
			.fetch({ limit: 100 })
			.then(messages => message.channel.bulkDelete(messagecount))
			.then(msgs => {
				message.lineReplyNoMention(`\`\`\`js
${msgs.size} عدد الرسائل التي تم مسحها
\`\`\``).then(messages => messages.delete({ timeout: 3000 }));
}).catch(err => 0);

    }
}




	