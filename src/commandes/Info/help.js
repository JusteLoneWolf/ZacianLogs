const Command = require("../../Base/Command");
const {
    HELPER
} = require("../../Utils/Constant/CommandeHelper");

class Help extends Command {
    constructor(client) {
        super(client, HELPER.COMMANDS.INFO.HELP);
        this.client = client
    }

    run = async (message, args, guildData) => {
        if (!args[0]) {
            const categorie = [];

            for (const c of this.client.commands.array()) {
                if (!categorie.includes(c.help.category)) {
                    categorie.push(c.help.category);
                }
            }
            await message.channel.send({
                embed: {
                    title: this.client.user.username,
                    author: {
                        name: `${this.client.user.username} | Commandes`,
                        icon_url: this.client.user.avatarURL()
                    },
                    description: `${message.guild ? guildData.prefix : "zac!"}help [nom de la commande] pour plus d'aide `,
                    fields: categorie.sort().map(c => {
                        return {
                            name: `❱ ${c}`,
                            value: this.client.commands.filter((command) => command.help.category === c).map((command) => `\`${command.help.name}\``).join(`, `),
                        };
                    }),
                }
            })
        } else {

            let page = 1
            let command = args[0];
            if (this.client.commands.has(command)) {
                command = this.client.commands.get(command);
            } else if (this.client.aliases.has(command)) {
                command = this.client.commands.get(this.client.aliases.get(command));
            }
            if (!command.conf) return message.channel.send("Cette commande n'existe pas");
            let subcmdInfo = ""

            for (let test of command.help.args) {
                subcmdInfo += `**Description** ${test.description}\n${test.arg}\n\n**Exemple** ${test.usage}}\n\n`
            }
            console.log(subcmdInfo)

            message.channel.send({
                embed: {
                    title: `Page d'aide de ${command.help.name}`,
                    fields: [{
                        name: "Description",
                        value: command.help.description
                    },
                        {
                            name: "Usage",
                            value: command.help.usage
                        },
                        {
                            name: "Aliase",
                            value: command.conf.aliases.join(", ")
                        },
                        {
                            name: "Exemple",
                            value: command.help.exemple
                        }
                    ]

                }
            }).then(msg => {
                msg.react("◀").then(() => {
                    msg.react("❌").then(() => {
                        msg.react("▶").then(() => {
                            const backF = (reaction, user) => reaction.emoji.name === "◀" && user.id === message.author.id;
                            const forF = (reaction, user) => reaction.emoji.name === "▶" && user.id === message.author.id;
                            const delF = (reaction, user) => reaction.emoji.name === "❌" && user.id === message.author.id;
                            const del = msg.createReactionCollector(delF, {
                                time: 180000
                            });
                            const back = msg.createReactionCollector(backF, {
                                time: 180000
                            });
                            const forw = msg.createReactionCollector(forF, {
                                time: 180000
                            });

                            back.on("collect", async r => {
                                if (page === 1) return r.users.remove(message.author.id)
                                page = 1
                                await msg.edit({
                                    embed: {
                                        title: `Page d'aide de ${command.help.name}`,
                                        fields: [{
                                            name: "Description",
                                            value: command.help.description
                                        },
                                            {
                                                name: "Usage",
                                                value: command.help.usage
                                            },
                                            {
                                                name: "Aliase",
                                                value: command.conf.aliases.join(", ")
                                            },
                                            {
                                                name: "Exemple",
                                                value: command.help.exemple
                                            }
                                        ]

                                    }
                                })
                                await r.users.remove(message.author.id)
                            });

                            forw.on("collect", async r => {

                                if (page === 2) return r.users.remove(message.author.id)
                                page = 2
                                await msg.edit({
                                    embed: {
                                        title: `Page d'aide de ${command.help.name}`,
                                        description: subcmdInfo
                                    }
                                })
                                await r.users.remove(message.author.id)


                            });

                        })
                    })
                })
            })


        }
    }
}

module.exports = Help;
