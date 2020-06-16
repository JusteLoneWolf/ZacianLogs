
module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async run(oldMessage,newMessage) {
        if (newMessage.author.bot) return;
        let db = await this.client.dbmanager.getGuild(newMessage.guild);
        if(!db) return;
        let channel= newMessage.guild.channels.cache.get(db.channels.log);
        if(!channel) return;

        return channel.send({
            embed:{
                title:"Message Logs",
                description:"Un membre vient de mettre a jours son message",
                color :0xF5AD2E,
                fields:[
                    {
                        name:"❱ Utilisateur",
                        value : newMessage.member.user.username
                    },
                    {
                        name:"❱ Ancien message",
                        value: oldMessage.content
                    },
                    {
                        name:"❱ Nouveau message",
                        value: newMessage.content
                    }
                ]
            }
        })

    }
};