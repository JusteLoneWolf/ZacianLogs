module.exports = class {
    constructor(client) {
        this.client = client;
    }
    run(client,message){

        if (!this.client.guildDB.get(message.guild.id)) return;
        let channel = message.guild.channels.cache.get(this.client.guildDB.get(message.guild.id,"channels.logs"));
        if(!channel )return;

        if(message.content.match(/(discord\.gg|discord\.com\/invite)\/.+/)){
            for(const invitation of message.content.split(' ')){
                if(message.content.match(/(discord\.gg|discord\.com\/invite)\/.+/)){
                    this.client.fetchInvite(invitation).then(invite => {
                        channel.send({
                            embed:{
                                title:"Invitation Logs",
                                description: "Une invitation a etait posté",
                                fields:[
                                    {
                                        name:"Nom du serveur de l'invitation",
                                        value:invite.guild.name
                                    },
                                    {
                                        name:"Nom du channel de l'invitation",
                                        value: invite.channel
                                    },
                                    {
                                        name:"Nom du createur de l'invitation",
                                        value: invite.inviter.username
                                    },
                                    {
                                        name:"L'invitation",
                                        value:invitation
                                    }
                                ]
                            }
                        })
                    })
                }
            }

        }

    }
};