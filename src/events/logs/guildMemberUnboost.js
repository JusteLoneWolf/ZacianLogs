module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(member) {
        let db = await this.client.dbmanager.getGuild(newMember.guild)
        if(!db) return;
        let channel = member.guild.channels.cache.get(db.channels.log)

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