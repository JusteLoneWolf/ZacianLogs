

module.exports = class {
    constructor(client) {
        this.client = client;
    }
    run(oldMember,newMember){
        if (!this.client.guildDB.get(newMember.guild.id)) return

        require('../../Utils/Logs/handlerMemberUpdate')(this.client,oldMember,newMember)
    }
};