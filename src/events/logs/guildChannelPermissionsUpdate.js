

module.exports = class {
    constructor(client) {
        this.client = client;
    }
    run(oldChannel,newChannel){
        let db = this.client.dbmanager.getGuild(newChannel)
        if(!db) return
        let channel = newGuild.channels.cache.get(db.channels.log)
        if(!channel )return;

        channel.send({
            embed:{
                title:"Channel Logs",
                description:"Les permission d'un channel ont etait chnage",
                color :0xF5AD2E,
                fields:[
                    {
                        name:"❱ Ancien Permission",
                        value : oldChannel.permissionOverwrites
                    },
                    {
                        name:"❱ Nouvelle Permission",
                        value : newChannel.permissionOverwrites
                    }
                ]
            }
        })
    }
};