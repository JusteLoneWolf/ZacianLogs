const Command = require("../../Base/Command");
const {HELPER } = require("../../Utils/Constant/CommandeHelper");
class ListWarn extends Command {
    constructor(client) {
        super(client, HELPER.COMMANDS.MOD.LISTWARN);
    }

    async run(message) {
       let i

        const mention = message.mentions.members.first();
        if (!mention) return message.channel.send("Vous devez mentionné un utilisateur");
        const db = this.client.guildDB.get(message.guild.id);
        if (!db.warns[mention.id]) message.channel.send("Cette utilisateur n'as pas de warn");
        let warn = [];

        let mapwarn = db.warns[mention.id].map(g => g)

        for (i = 0; i < 10; i++) {
            let nombre = i + 1;
            warn.push(`Warn n°${nombre}:\n╚>Raison: ${mapwarn[i].raison}\n╚>Date: ${mapwarn[i].time}\n`)
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
                        const Del = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
                        const del = msg.createReactionCollector(Del, {time: 180000});
                        const back = msg.createReactionCollector(backF, {time: 180000});
                        const For = msg.createReactionCollector(ForF, {time: 180000});

                        back.on('collect', async r => {
                            let x = i - 10;
                            if (x <= 0) return
                            i -= 20;
                            let warn = [];

                            for (i; i < x; i++) {
                                let nombre = i + 1;

                                if (i >= 0 - 1) {
                                    warn.push(`Warn n°${nombre}:\n╚>Raison: ${mapwarn[i].raison}\n╚>Date: ${mapwarn[i].time}\n`)
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
                            if (i >= mapwarn.length - 1) return

                            let t = i + 10;
                            let warn = [];
                            for (i; i < t; i++) {

                                let nombre = i + 1;
                                if (i <= mapwarn.length - 1) {
                                    warn.push(`Warn n°${nombre}:\n╚>Raison: ${mapwarn[i].raison}\n╚>Date: ${mapwarn[i].time}\n`)
                                }
                            }
                            await msg.edit({
                                embed: {
                                    title: `Warns de ${mention.user.username}`,
                                    description: warn.join('\n')
                                }
                            });


                        })
                        del.on('collect', async r => {
                            await msg.edit({
                                embed: {
                                    description: "La liste de warn a etait supprimé"
                                }
                            }).then(()=>{
                                For.stop();
                                back.stop();
                                msg.reactions.removeAll()
                            })
                        })
                    })
                })
            });
        })

    }
}

module.exports = ListWarn;

//TODO WARNLIST