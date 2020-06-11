

module.exports = class {
    constructor(client) {
        this.client = client;
    }
    run(oldGuild,newGuild){

        let db = this.client.dbmanager.getGuild(newGuild)
        if(!db) return
        let channel = newGuild.channels.cache.get(db.channels.log)
        if(!channel )return;

        channel.send({
            embed:{
                title:"Boost Logs",
                description:"La guild vient de perdre un niveau",
                color :0xF5AD2E,
                fields:[
                    {
                        name:"❱ Ancien Niveau",
                        value : oldGuild.premiumTier
                    },
                    {
                        name:"❱ Nouveau Niveau",
                        value : newGuild.premiumTier
                    }

                ]
            }
        })
    }
};