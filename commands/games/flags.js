const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

var x = [
    "https://cdn.discordapp.com/attachments/836065807028453457/840313849239830555/south_africa.png",
    "https://cdn.discordapp.com/attachments/836065807028453457/840313859498704896/Singapore.png",
    "https://cdn.discordapp.com/attachments/836065807028453457/840313865254207548/jorden.png",
    "https://cdn.discordapp.com/attachments/836065807028453457/840313870777974824/indonesia.png",
    "https://cdn.discordapp.com/attachments/836065807028453457/840313876640956506/Norway.png",
    "https://cdn.discordapp.com/attachments/836065807028453457/840313883255373882/iraq.png",
    "https://cdn.discordapp.com/attachments/836065807028453457/840316296998158407/280px-Flag_of_Senegal.svg.png"
];
var x2 = [
    "افرقيا الجنوبة",
    "سينقافورة",
    "الاردن",
    "اندنوسيا",
    "النرويج",
    "العراق",
    "السنغال"
];

module.exports = {
    name: "flags",
    cooldown: 15,
    aliases: ["اعلام"],
    time: "15",
    usage: "flags",
    category: "games",
    description : "Guess the flag",
    run: async(client, message, args) => {

        var x3 = Math.floor(Math.random() * x.length);
message.lineReplyNoMention(new MessageEmbed()
.setColor(client.build.warn.color)
.setImage(`${x[x3]}`)
.setDescription(`**${client.build.warn.emoji} You Have ` + module.exports.time + `s To Type The Correct Answer!**`, true)).then(() => {
            var r = message.channel.awaitMessages(msg => msg.content == x2[x3], {
                max: 1,
                time: module.exports.time * 1000,
                errors: ["time"]
            });
            r.catch(() => {
message.lineReplyNoMention(new MessageEmbed()
                    .setColor(client.build.err.color)
                    .setTitle(client.build.err.emoji + " **Time Out!**")
                    .setDescription(`**Time is end and no one type the correct answer**`));
            });

            r.then(async collected => {
message.lineReplyNoMention(new MessageEmbed()
.setColor(client.build.done.color)
.setDescription(`**${collected.first().author}** Has typed the correct answer 🎉`));
                var points = await db.fetch(`points_${message.guild.id}_${collected.first().author.id}`);
                if (points == null) points = db.set(`points_${message.guild.id}_${collected.first().author.id}`, {
                    user: collected.first().author.id,
                    guild: collected.first().author.id,
                    points: 0
                })
                else {
                    db.add(`points_${message.guild.id}_${collected.first().author.id}.points`, 1)
                }
            }).catch(err => {
                console.log()
            })
        });
    }
};