

module.exports = class {
    constructor(client) {
        this.client = client;
    }
    run(oldChannel,newChannel){
        if (!this.client.guildDB.get(newChannel.guild.id)) return;

        let channel = newChannel.guild.channels.cache.get(this.client.guildDB.get(newChannel.guild.id,"channels.logs"));
        if(!channel )return;

       // return console.log(oldChannel.permissionOverwrites)

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