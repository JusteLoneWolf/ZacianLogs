

module.exports = class {
    constructor(client) {
        this.client = client;
    }
    run(oldChannel,newChannel){
        console.log(newChannel.permissionOverwrites)

        let channel = newChannel.guild.channels.cache.get(this.client.guildDB.get(channel.guild.id,"channels.logs"));
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