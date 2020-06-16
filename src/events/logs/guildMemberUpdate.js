

module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async run(oldMember,newMember){
        let db = await this.client.dbmanager.getGuild(newMember.guild);
        if (!db) return;

        require('../../Utils/Logs/handlerMemberUpdate')(this.client,oldMember,newMember)
    }
};