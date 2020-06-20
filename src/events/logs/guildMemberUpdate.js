

module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async run(oldMember,newMember){
        if(!newMember.guild.me.permissions.has(["SEND_MESSAGES", "VIEW_AUDIT_LOG", "EMBED_LINKS","MANAGE_CHANNELS","MANAGE_GUILD"], true)) return;

        let db = await this.client.dbmanager.getGuild(newMember.guild);
        if (!db) return;

        require('../../Utils/Logs/handlerMemberUpdate')(this.client,oldMember,newMember)
    }
};