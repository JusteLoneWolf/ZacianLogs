

module.exports = class {
    constructor(client) {
        this.client = client;
    }
    run(oldGuild,newGuild){
        let channel = newGuild.channels.cache.get(this.client.guildDB.get(newGuild.id,"channels.logs"));
        if(!channel )return;

        channel.send({
            embed:{
                title:"Boost Logs",
                description:"La guild vient de gagner un niveau",
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