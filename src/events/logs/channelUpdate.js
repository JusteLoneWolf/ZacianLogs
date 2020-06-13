

module.exports = class {
    constructor(client) {
        this.client = client;
    }
   async run(oldChannel,newChannel){
        let db = await this.client.dbmanager.getGuild(newChannel.guild)
        if (!db) return;
        require('../../Utils/Logs/handlerGuildChannel')(this.client,oldChannel,newChannel)
    }
};