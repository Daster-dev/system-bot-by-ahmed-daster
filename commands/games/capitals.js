const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

var x = [
	"العراق",
	"السعودية",
	"سوريا",
	"فلسطين",
	"المغرب",
	"امريكا",
	"اسبانية",
	"ايطاليا"
	
	]
var x2 = [
	"بغداد",
	"الرياض",
	"دمشق",
	"القدس",
	"الرباط",
	"واشنطن", 
	"مدريد",
	"لندن"
	];


module.exports = {
    name: "capitals",
    cooldown: 15,
    aliases: ["عواصم"],
    time: "15",
    usage: "capitals",
    category: "games",
    description : "Guess the capitals",
    run: async(client, message, args) => {

        var x3 = Math.floor(Math.random() * x.length);
message.lineReplyNoMention(new MessageEmbed()
.setColor(client.build.warn.color)
.setDescription(`**${client.build.warn.emoji} You Have ` + module.exports.time + `s To Type The Correct Answer!** \n \`\`\`${x[x3]}\`\`\``, true)).then(() => {
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