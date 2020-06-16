
module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(message,mention,db) {
        if(!db) return;
        let channel= await message.guild.channels.cache.get(db.channels.log);
        if(!channel) return;

        channel.send({
            embed:{
                title:"Warn Logs",
                description:"Un utilisateur vient d'etre warn",
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
                        value: db.warns[mention.user.id][db.warns[mention.user.id].length-1].raison
                    }
                ]
            }
        })


    }
};