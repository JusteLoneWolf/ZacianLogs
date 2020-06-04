

module.exports = class {
    constructor(client) {
        this.client = client;
    }
    run(oldGuild,newGuild){
        if (!this.client.guildDB.get(newGuild.id)) return;

        require('../../Utils/Logs/handlerGuildUpdate')(this.client,oldGuild,newGuild)
    }
};