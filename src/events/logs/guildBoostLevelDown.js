

module.exports = class {
    constructor(client) {
        this.client = client;
    }
   async run(oldGuild,newGuild){

        let db =await this.client.dbmanager.getGuild(newGuild)
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