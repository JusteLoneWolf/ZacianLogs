

module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async run(oldGuild,newGuild){
        let db = await this.client.dbmanager.getGuild(newChannel.guild)
        if (!db) return;

        require('../../Utils/Logs/handlerGuildUpdate')(this.client,oldGuild,newGuild)
    }
};