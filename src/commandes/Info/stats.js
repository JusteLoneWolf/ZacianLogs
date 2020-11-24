const moment = require("moment");
moment.locale("fr");
const {
    totalmem,
    cpus,
    loadavg
} = require("os");

const Command = require("../../Base/Command");
const {
    HELPER
} = require("../../Utils/Constant/CommandeHelper");
class Ping extends Command {
    constructor(client) {
        super(client, HELPER.COMMANDS.INFO.INFO);
        this.client = client

    }

    run = (message) => {
        return message.channel.send({
            embed: {
                description: "Statistiques du bot",
                fields: [{
                        name: "RAM",
                        value: `${Math.trunc((process.memoryUsage().heapUsed) / 1024 / 1000)} MB / ${Math.trunc(totalmem() / 1024 / 1000)} MB (${Math.round((Math.round(process.memoryUsage().heapUsed / 1024 / 1024) / Math.round(totalmem() / 1024 / 1024)) * 100)}%)`,
                    },
                    {
                        name: "CPU",
                        value: (loadavg()[0] / cpus().length).toFixed(2) + "%"
                    },
                    {
                        name: "Uptime",
                        value: moment.duration(this.client.uptime).format(`y [année,] M [mois,] w [semaine,] d [jours ,] h [heures,] m [minutes ,] s [secondes]`).replace("secondses", "secondes")
                    },
                    {
                        name: "Nombre de servers",
                        value: this.client.guilds.cache.size
                    }
                ]
            }
        })
    }
}

module.exports = Ping;
