const moment = require("moment");
moment.locale("fr");

const Command = require("../../Base/Command");
const {HELPER } = require("../../Utils/Constant/CommandeHelper");
class Botinfo extends Command {
    constructor(client) {
        super(client, HELPER.COMMANDS.INFO.BOTINFO);
    }

    run(message) {
        return message.channel.send({
            embed:{
                description:"Information du bot",
                fields:[
                    {
                        name:"Créateur",
                        value:`${this.client.users.cache.get(this.client.config.owner[0]).username || '[BCFB] zechaos#2310'} `,
                    },
                    {
                        name:"Code Source",
                        value: "[Code source du bot](https://github.com/zechaos031/ZacianLogs)"
                    },
                    {
                        name: "Invitation",
                        value: "[Invitation du bot](https://discord.com/api/oauth2/authorize?client_id=717658826379231256&permissions=268504246&scope=bot)"
                    },
                ]
            }
        })
    }
}

module.exports = Botinfo;