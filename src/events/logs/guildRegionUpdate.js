

module.exports = class {
    constructor(client) {
        this.client = client;
    }
    run(oldGuild,newGuild){
        let db = this.client.dbmanager.getGuild(newMember.guild)
        if(!db) return;
        let channel = newMember.guild.channels.cache.get(db.channels.log)
        if(!channel )return;

        channel.send({
            embed:{
                title:"Serveur Logs",
                description:"La guild vient de changé de region",
                color :0xF5AD2E,
                fields:[
                    {
                        name:"❱ Ancienne Region",
                        value : oldGuild.region
                    },
                    {
                        name:"❱ Nouvelle Region",
                        value : newGuild.region
                    }
                ]
            }
        })
    }
};