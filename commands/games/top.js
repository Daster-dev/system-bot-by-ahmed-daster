const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "top-points",
    cooldown: 5,
    aliases: ["games-leaderboard", "games-points", "top-games"],
    usage: "top-points",
    category: "games",
    description : "server top games",
    run: async(client, message, args) => {

        let points = db.fetch(`points_${message.guild.id}`)

        const usersData = []
        message.guild.members.cache.forEach(user => {
            usersData.push(user)
        })

        var pointsContent = usersData.length;
        let usersContent = 0;
        let usersMaxContent = 21;

        let tempData = [];

        for (let i = 0; i < pointsContent; i++) {
            var database = db.fetch(`points_${message.guild.id}_${usersData[i].id}`)
            if (database == null) continue;

            tempData.push({
                name: usersData[i].user.id,
                data: database
            });
        }
        const leaderboardData = []
        tempData.sort((a, b) => b.data - a.data);
        for (let k = 0; k < tempData.length; k++) {
            usersContent++
            if (usersContent >= usersMaxContent) continue;
            leaderboardData.push(`${k+1}# <@!${tempData[k].name}> points: \`${tempData[k].data.points}\``)
        }

        var topValue = leaderboardData.join('\n')

message.lineReplyNoMention(new MessageEmbed().setAuthor(message.guild.name + ` - Leaderboard!` + client.build.done.emoji, message.guild.iconURL({ dynamic: true }))
.setColor(client.build.done.color).setDescription(topValue).setFooter(`بالطلب من : ${message.author.tag}`));
    }
};