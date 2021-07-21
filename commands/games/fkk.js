const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

var x = [
  "https://cdn.discordapp.com/attachments/836065807028453457/841035419209957396/f8cf710641f30412.png",
  "https://cdn.discordapp.com/attachments/836065807028453457/841035427557539860/f264ab16b4933934.png",
  "https://cdn.discordapp.com/attachments/836065807028453457/841035438709538826/84ec7c06b842c81a.png",
  "https://cdn.discordapp.com/attachments/836065807028453457/841035446687760424/e0071a1e26ceddca.png",
  "https://cdn.discordapp.com/attachments/836065807028453457/841035456245268500/ffd35c8e418f906e.png",
  "https://cdn.discordapp.com/attachments/836065807028453457/841035469936394260/903ddf7c3e7f0287.png",
  "https://cdn.discordapp.com/attachments/836065807028453457/841035474477907978/7a1a3fdf09e9aef3.png",
  "https://cdn.discordapp.com/attachments/836065807028453457/841035480052400139/f2de23d29bd94cad.png"

]
var x2 = [
   "ا ك س ع م ك",
   "د ا س ت ر",
   "د س ك و ر د",
   "ر ي و ا ر د",
   "ف ي ر ل ب و ت",
   "ك ل م ا ت",
   "م ن ا ن ا",
   "ه ا ي"
];


module.exports = {
    name: "fkk",
    cooldown: 15,
    aliases: ["فكك"],
    time: "15",
    usage: "fast",
    category: "games",
    description : "jaw the sentence",
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