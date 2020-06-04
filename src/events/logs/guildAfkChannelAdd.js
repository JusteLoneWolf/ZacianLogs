

module.exports = class {
    constructor(client) {
        this.client = client;
    }
    run(oldGuild,newGuild){
        if (!this.client.guildDB.get(newGuild.id)) return;

        let channel = newGuild.channels.cache.get(this.client.guildDB.get(newGuild.id,"channels.logs"));
        if(!channel )return;

        channel.send({
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