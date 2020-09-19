
module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(oldMessage,newMessage) {
       //if(!newMessage.guild.me.permissions.has(["SEND_MESSAGES", "VIEW_AUDIT_LOG", "EMBED_LINKS","MANAGE_CHANNELS","MANAGE_GUILD"], true)) return;

        if (!newMessage.author || newMessage.author.bot) return;

        let db = await this.client.dbmanager.getGuild(newMessage.guild);
        if (!db) return;

        if(newMessage.channel.type ==="dm" || newMessage.author.bot) return;
        require('../../Utils/Logs/handlerMessageUpdate')(this.client,oldMessage,newMessage)

    }
};