const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ms = require('ms')

module.exports = {
    name: "mute",
    cooldown: 5,
    aliases: ["mute"],
    usage: "mute [user] [time]",
    category: "admin",
    description : "To mute some one from text",
    run: async(client, message, args) => {
 
        let embed2 = new MessageEmbed().setColor(client.build.err.color)
            .setDescription(client.build.err.emoji + "  **Please Mention/ID Same One!**")
            .setFooter(`Request By ${message.author.tag}`).setTimestamp()
        let embed3 = new MessageEmbed().setColor(client.build.err.color)
            .setDescription(client.build.err.emoji + "  **WTF Are You Doing ??**")
            .setFooter(`Request By ${message.author.tag}`).setTimestamp()
        let embed4 = new MessageEmbed().setColor(client.build.err.color)
            .setDescription(client.build.err.emoji + "  **WTF Are You Doing ??**")
            .setFooter(`Request By ${message.author.tag}`).setTimestamp()
        let embed5 = new MessageEmbed().setColor(client.build.err.color)
            .setDescription(client.build.err.emoji + "  **Soory I Can't Mute Same One High Than Me >_<**")
            .setFooter(`Request By ${message.author.tag}`).setTimestamp()
        let embed6 = new MessageEmbed().setColor(client.build.err.color)
            .setDescription(client.build.err.emoji + "  **You Need `MANAGE_ROLES` Permission To Use This Command!**")
            .setFooter(`Request By ${message.author.tag}`).setTimestamp()
        if (!message.member.hasPermission('MANAGE_ROLES')) return message.lineReplyNoMention(embed6)
        let member = message.mentions.users.first() || client.users.cache.get(message.content.split(' ')[1])
        var user = message.guild.member(member)
        if (!user) return message.lineReplyNoMention(embed2)
        if (user.id === message.author.id) return message.lineReplyNoMention(embed3)
        if (user.id === client.user.id) return message.lineReplyNoMention(embed4)
        if (!message.guild.member(user).bannable) return message.lineReplyNoMention(embed5)
        let muteRole = message.guild.roles.cache.find(n => n.name === 'Muted')
        if (!muteRole) {
            message.guild.roles.create({
                data: {
                    name: "Muted",
                }
            }).then(async(role) => {
                await message.guild.channels.cache.forEach(channel => {
                    channel.overwritePermissions([{
                        id: role.id,
                        deny: ["SEND_MESSAGES"]
                    }]);
                })
            })
        }
        user.roles.add(muteRole).catch((err) => {
            let embed8 = new MessageEmbed().setColor(client.build.err.color)
                .setDescription(`**Error**`)
                .setDescription(`Error: ${err.message}`)
                .setTimestamp()
            return message.lineReplyNoMention(embed8)
        })
        var time = args[1]
        if (!time) time = '24h'
        message.lineReplyNoMention(new MessageEmbed().setColor(client.build.done.color).setDescription(`${client.build.done.emoji}  **${user} Has Ben Muted By <@!${message.author.id}>**`).setFooter(`Request By ${message.author.tag}`).setTimestamp())
        setTimeout(() => {
            user.roles.remove(muteRole);
        }, ms(time));
        return;
    }
};