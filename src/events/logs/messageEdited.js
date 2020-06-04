
module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async run(oldMessage,newMessage) {
        if (newMessage.author.bot) return;
        if (!this.client.guildDB.get(newMessage.guild.id)) return;

        let channel = newMessage.guild.channels.cache.get(this.client.guildDB.get(newMessage.guild.id,"channels.logs"));

        if(!channel )return;

        channel.send({
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