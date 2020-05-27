module.exports = class {
    constructor(client) {
        this.client = client;
    }
    run(message,data){

        let channel = message.guild.channels.cache.get(this.client.guildDB.get(message.guild.id,"channels.logs"))

        if(!channel )return

        message.channel.send({
            embed:{
                title:"Anti Insulte Logs",
                description:"Message supprimer",
                color :0xF5AD2E,
                fields:[
                    {
                        name:" Utilisateur",
                        value : message.author.username
                    },
                    {
                        name:" Contenu",
                        value:message.content.length > 1090 ? message.content.substr(0,10) +"..." : message.content
                    },
                    {
                        name:" Roles",
                        value:message.member.roles.cache.size<0 ? message.member.roles.cache.filter(filter => filter.name !== "@everyone").map(role => `${role.name}`).join(" - ") : "Pas de roles"
                    },
                    {
                        name:" Mauvais mot",
                        value: data,
                    }
                ]
            }
        })
    }
};