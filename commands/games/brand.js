const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

var x = [
    "https://cdn.discordapp.com/attachments/836065807028453457/841068738572320818/download.jpg",
    "https://cdn.discordapp.com/attachments/836065807028453457/841068905493037056/images.png",
    "https://cdn.discordapp.com/attachments/836065807028453457/841069115284258836/images-cutout.png",
    "https://cdn.discordapp.com/attachments/836065807028453457/841069657145344051/images-cutout.png"
];
var x2 = [
    "فوتوشوب",
    "يوتيوب",
    "ريزر",
    "نتندو سويج"
];

module.exports = {
    name: "brand",
    cooldown: 15,
    aliases: ["شركة"],
    time: "10",
    usage: "brand",
    category: "games",
    description : "Guess the brand",
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
                    .setDescription(`**Time is end and no one type the correct answer**`))
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
                console.log(err)
            })
        });
    }
};

