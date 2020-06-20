

module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async run(oldGuild,newGuild){
        if(!newGuild.me.permissions.has(["SEND_MESSAGES", "VIEW_AUDIT_LOG", "EMBED_LINKS","MANAGE_CHANNELS","MANAGE_GUILD"], true)) return;

        let db = await this.client.dbmanager.getGuild(newGuild.guild);
        if (!db) return;

        require('../../Utils/Logs/handlerGuildUpdate')(this.client,oldGuild,newGuild)
    }
};