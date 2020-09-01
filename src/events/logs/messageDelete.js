
module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(message) {
        if(!message.guild.me.permissions.has(["SEND_MESSAGES", "VIEW_AUDIT_LOG", "EMBED_LINKS","MANAGE_CHANNELS","MANAGE_GUILD"], true)) return;

        if(message.channel.type ==="dm") return;
        let db = await this.client.dbmanager.getGuild(message.guild);
        if(!db) return;
        let channeldb = message.guild.channels.cache.get(db.channels.log);
        if(!channeldb )return;

        let content = message.content;
        if(content.length > 1024){
            content = message.content.substr(0,1000);
            content = content + "\n Trop long..."
        }

        return channeldb.send({
            embed:{
                title:"Message Logs",
                description:"Un message vient d'être supprimé",
                color :0xF5AD2E,
                fields:[
                    {
                        name:"❱ Autheur du message",
                        value : message.author.username
                    },
                    {
                        name:"❱ Message",
                        value : content
                    }
                ]
            }
        })


    }
};