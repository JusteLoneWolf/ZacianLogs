
module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(member) {
        let db = await this.client.dbmanager.getGuild(member.guild)
        if(!db) return
        let channel = member.guild.channels.cache.get(db.channels.log)
        if(!channel )return;

        if(!channel )return;

        channel.send({
            embed:{
                title:"Boost Logs",
                description:"Un membre vient de boost",
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