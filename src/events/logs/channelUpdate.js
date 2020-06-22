

module.exports = class {
    constructor(client) {
        this.client = client;
    }
   async run(oldChannel,newChannel){
       if(!newChannel.guild.me.permissions.has(["SEND_MESSAGES", "VIEW_AUDIT_LOG", "EMBED_LINKS","MANAGE_CHANNELS","MANAGE_GUILD"], true)) return;

       let db = await this.client.dbmanager.getGuild(newChannel.guild);
        if (!db) return;
        require('../../Utils/Logs/handlerGuildChannel')(this.client,oldChannel,newChannel)
    }
};