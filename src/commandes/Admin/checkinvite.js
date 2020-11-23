const Command = require("../../Base/Command");
const {
    HELPER
} = require("../../Utils/Constant/CommandeHelper");
class Checkinvite extends Command {
    constructor(client) {
        super(client, HELPER.COMMANDS.MOD.CHECKINVITE);
        this.client = client

    }

    run(message, args) {
        if (!args[0]) return message.channel.send("Merci de spécifier une invitation");
        this.client.fetchInvite(args[0]).then(invite => {
            message.channel.send({
                embed: {
                    fields: [{
                            name: "ID du serveur",
                            value: invite.guild.id
                        },
                        {
                            name: "Nom du serveur de l'invitation",
                            value: invite.guild.name
                        },
                        {
                            name: "Nom du channel de l'invitation",
                            value: invite.channel
                        },
                        {
                            name: "Nom du createur de l'invitation",
                            value: invite.inviter.username
                        },
                        {
                            name: "Nombre de membre",
                            value: invite.guild.memberCount ? invite.guild.memberCount : "Impossible de recupérer le nombre de membre"
                        }
                    ]
                }
            })
        })
    }
}

module.exports = Checkinvite;
