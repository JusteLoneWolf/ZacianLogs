

module.exports = class {
    constructor(client) {
        this.client = client;
    }
    run(oldMember,newMember){
        if (!this.client.guildDB.get(newMember.guild.id)) return;

        let channel = newMember.guild.channels.cache.get(this.client.guildDB.get(newMember.guild.id,"channels.logs"));

        if(!channel )return;

        channel.send({
            embed:{
                title:"Membre Logs",
                description:"Un membre de change de pseudo",
                color :0xF5AD2E,
                fields:[
                    {
                        name:"❱ Ancien pseudo",
                        value : oldMember.nickname === null ? oldMember.user.username : oldMember.nickname
                    },
                    {
                        name:"❱ Nouveau pseudo",
                        value:newMember.nickname === null ? newMember.user.username : newMember.nickname
                    },
                    {
                        name: "❱ Utilisateur",
                        value: newMember.user.username
                    }
                ]
            }
        })
    }
};