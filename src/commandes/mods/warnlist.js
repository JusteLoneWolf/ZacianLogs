const Command = require("../../Base/Command");
const {HELPER } = require("../../Utils/Constant/CommandeHelper");
class ListWarn extends Command {
    constructor(client) {
        super(client, HELPER.COMMANDS.MOD.LISTWARN);
    }

    async run(message) {
       /* let i

        const mention = message.mentions.members.first();
        if (!mention) return message.channel.send("Vous devez mentionné un utilisateur");
        const db = this.client.guildDB.get(message.guild.id);
        if (!db.warns[mention.id]) message.channel.send("Cette utilisateur n'as pas de warn");
        let warn = [];
        let remember = 0

        let mapwarn = db.warns[mention.id].map(g => g)

        for (i = 0; i < 10; i++) {
            let nombre = i + 1;
            warn.push(`Warn n°${nombre}: raison: ${mapwarn[i].raison} date: ${mapwarn[i].time}`)
        }
        message.channel.send({
            embed: {
                title: `Warns de ${mention.user.username}`,
                description: warn.join('\n')
            }
        }).then(msg => {
            msg.react('◀').then(() => {
                msg.react('❌').then(() => {
                    msg.react('▶').then(() => {
                        const backF = (reaction, user) => reaction.emoji.name === '◀' && user.id === message.author.id;
                        const ForF = (reaction, user) => reaction.emoji.name === '▶' && user.id === message.author.id;
                        const back = msg.createReactionCollector(backF, {time: 180000});
                        const For = msg.createReactionCollector(ForF, {time: 180000});

                        back.on('collect', async r => {
                            let x = i - 10;
                            if (x <= 0) {
                                return r.remove(message.author.id)
                            }
                            i -= 20;
                            let warn = [];

                            for (i; i < x; i++) {
                                let nombre = i + 1;

                                if (i >= 0 - 1) {
                                    warn.push(`Warn n°${nombre}: raison: ${mapwarn[i].raison} date: ${mapwarn[i].time}`)
                                }
                            }
                            await msg.edit({
                                embed: {
                                    title: `Warns de ${mention.user.username}`,
                                    description: warn.join('\n')
                                }
                            })
                        })
                        For.on('collect', async r => {
                            if (i <= mapwarn.length - 1) {
                                return r.remove(message.author.id)
                            }

                            let t = i + 10;
                            let warn = [];
                            for (i; i < t; i++) {

                                let nombre = i + 1;
                                if (i <= mapwarn.length - 1) {
                                    warn.push(`Warn n°${nombre}: raison: ${mapwarn[i].raison} date: ${mapwarn[i].time}`)
                                }
                            }
                            await msg.edit({
                                embed: {
                                    title: `Warns de ${mention.user.username}`,
                                    description: warn.join('\n')
                                }
                            });


                        })

                    })
                })
            });
        })*/

    }
}

module.exports = ListWarn;

//TODO WARNLIST