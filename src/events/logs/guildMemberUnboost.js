module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(member) {
        let channel = member.guild.channels.cache.get(this.client.guildDB.get(member.guild.id,"channels.logs"));

        if(!channel )return;

        channel.send({
            embed:{
                title:"Boost Logs",
                description:"Un membre vient de unboost",
                color :0xF5AD2E,
                fields:[
                    {
                        name:"❱ Utilisateur",
                        value : member.user.username
                    },
                ]
            }
        })

    }
};