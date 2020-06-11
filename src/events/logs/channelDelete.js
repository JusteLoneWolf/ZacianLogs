
module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(channel) {
        if(channel.type ==="dm") return;
        let db = this.client.dbmanager.getGuild(channel.guild)
        if(!db) return
        let channeldb = channel.guild.channels.cache.get(db.channels.log)
        if(!channeldb )return;
        const aLogFound = await channel.guild.fetchAuditLogs({
            type: "CHANNEL_DELETE",
            limit: 1
        }).then(aLog => aLog.entries.first()).catch((err) => {
            this.client.emit("error", err)
        });

        channeldb.send({
            embed:{
                title:"Channel Logs",
                description:"Un channel vien d'etre créer",
                color :0xF5AD2E,
                fields:[
                    {
                        name:"❱ Créer par",
                        value : aLogFound.executor.username
                    },
                    {
                        name:"❱ Nom du channel",
                        value : aLogFound.changes[0].old
                    },
                    /*{
                        name:"❱ Permission",
                        value : aLogFound.changes[2].new.map(role => channel.guild.roles.cache.get(aLogFound.changes[2].new))
                    },*/
                    {
                        name:"❱ NSFW",
                        value : aLogFound.changes[3].old ? "Oui" : "Non"
                    }
                ]
            }
        })
    }
};