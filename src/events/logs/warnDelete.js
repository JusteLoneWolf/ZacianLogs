
module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(message,mention,db,args) {
        if(!db) return;
        let channel= await message.guild.channels.cache.get(db.channels.log);

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
                        value: db.warns[mention.user.id][args[1]-1].raison ? db.warns[mention.user.id][args[1]-1].raison: "Raison non trouvé"
                    }
                ]
            }
        })


    }
};