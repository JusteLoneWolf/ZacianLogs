
module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(message,mention,db) {

        let channel = message.guild.channels.cache.get(db.channels.logs);
        if(!channel )return;

        channel.send({
            embed:{
                title:"Warn Logs",
                description:"un warn vien d'etre supprimé",
                color :0xF5AD2E,
                fields:[
                    {
                        name:"❱ Utilisateur Warn",
                        value : mention.user.username
                    },
                    {
                        name:"❱ Modérateur",
                        value: message.author.username
                    },
                    {
                        name:"❱ Raison",
                        value: db.warns[mention.user.id][args[1]-1].raison
                    }
                ]
            }
        })


    }
};