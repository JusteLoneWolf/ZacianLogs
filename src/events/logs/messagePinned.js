
module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(newMessage) {

        let channel = newMessage.guild.channels.cache.get(this.client.guildDB.get(newMessage.guild.id,"channels.logs"));

        if(!channel )return;


        channel.send({
            embed:{
                title:"Message Logs",
                description:"Un message vient d'etre epinglé",
                color :0xF5AD2E,
                fields:[
                    {
                        name:"❱ Utilisateur",
                        value : newMessage.member.user.username
                    },
                    {
                        name:"❱ Message",
                        value: newMessage.content
                    },
                ]
            }
        })

    }
};