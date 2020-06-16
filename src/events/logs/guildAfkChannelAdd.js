

module.exports = class {
    constructor(client) {
        this.client = client;
    }
   async run(oldGuild,newGuild){

        let db = await this.client.dbmanager.getGuild(newGuild);
        if(!db) return;
        let channel = newGuild.channels.cache.get(db.channels.log);
        if(!channel )return;

       return channel.send({
            embed:{
                title:"Serveur Logs",
                description:"La guild vient de changé de salon afk",
                color :0xF5AD2E,
                fields:[
                    {
                        name:"❱ Ancienne Region",
                        value : oldGuild.afkChannel ? oldGuild.afkChannel : "Pas de channel AFK"
                    },
                    {
                        name:"❱ Nouvelle Region",
                        value : newGuild.afkChannel? newGuild.afkChannel : "Pas de channel AFK"
                    }
                ]
            }
        })
    }
};