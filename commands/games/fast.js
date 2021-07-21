const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

var x = [
    "https://cdn.discordapp.com/attachments/836065807028453457/841066506313007154/PicsArt_05-09-08.49.13.png",
    "https://cdn.discordapp.com/attachments/836065807028453457/841066533475713076/3a5f0f68dc4e886e.png",
    "https://cdn.discordapp.com/attachments/836065807028453457/841066542237220893/859f1db3cab473a9.png",
    "https://cdn.discordapp.com/attachments/836065807028453457/841066557157539870/c9039e110621e4a4.png",
    "https://cdn.discordapp.com/attachments/836065807028453457/841066568079245382/bd80726f600d0c49.png",
    "https://cdn.discordapp.com/attachments/836065807028453457/841068491057659954/PicsArt_05-09-08.49.13.png",
];
var x2 = [
    "فريل",
    "دسكورد",
    "فاسقيناكموه",
    "قسطنطينية",
    "هاي",
    "ادوبي",
]

module.exports = {
    name: "fast",
    cooldown: 15,
    aliases: ["اسرع"],
    time: "15",
    usage: "fast",
    category: "games",
    description : "faster member type the word",
    run: async(client, message, args) => {

        var x3 = Math.floor(Math.random() * x.length);
message.lineReplyNoMention(new MessageEmbed()
.setColor(client.build.warn.color)
.setImage(`${x[x3]}`)
.setDescription(`**${client.build.warn.emoji} لديك ` + module.exports.time + `s لكتابة الاجابة الصحيحة!**`, true)).then(() => {
            var r = message.channel.awaitMessages(msg => msg.content == x2[x3], {
                max: 1,
                time: module.exports.time * 1000,
                errors: ["time"]
            });
            r.catch(() => {
message.lineReplyNoMention(new MessageEmbed()
                    .setColor(client.build.err.color)
                    .setTitle(client.build.err.emoji + " **نفذ الوقت!**")
                    .setDescription(`**انتهى الوقت ولا أحد يكتب الإجابة الصحيحة**`));
            });

            r.then(async collected => {
message.lineReplyNoMention(new MessageEmbed()
.setColor(client.build.done.color)
.setDescription(`**${collected.first().author}** لقد كتب الإجابة الصحيحة 🎉`));
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