

module.exports = class {
    constructor(client) {
        this.client = client;
    }
    run(oldGuild,newGuild){
        let channel = newGuild.channels.cache.get(this.client.guildDB.get(newGuild.id,"channels.logs"));
        if(!channel )return;

        channel.send({
            embed:{
                title:"Serveur Logs",
                description:"La guild vient de changé de region",
                color :0xF5AD2E,
                fields:[
                    {
                        name:"❱ Ancienne Region",
                        value : oldGuild.bannerURL() ? oldGuild.bannerURL() : "Pas de banniere"
                    },
                    {
                        name:"❱ Nouvelle Region",
                        value : newGuild.bannerURL()? newGuild.bannerURL() : "Pas de banniere"
                    }
                ]
            }
        })
    }
};