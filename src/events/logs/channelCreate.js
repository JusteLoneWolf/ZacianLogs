
module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(channel) {
        if(channel.type ==="dm") return

        let channeldb = channel.guild.channels.cache.get(this.client.guildDB.get(channel.guild.id,"channels.logs"));
        if(!channeldb )return;
        const aLogFound = await channel.guild.fetchAuditLogs({
            type: "CHANNEL_CREATE",
            limit: 1
        }).then(aLog => aLog.entries.first()).catch((err) => {
            this.client.emit("error", err)
        });
        console.log(aLogFound.changes[2].new)
        for(const role of aLogFound.changes[2].new){
            console.log(role)
        }
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
                        value : aLogFound.changes[0].new
                    },
                    {
                        name:"❱ Permission",
                        value : aLogFound.changes[2].new.map(role => channel.guild.roles.cache.get(aLogFound.changes[2].new))
                    },
                    {
                        name:"❱ Nom du channel",
                        value : aLogFound.changes[0].new
                    }
                ]
            }
        })
    }
};