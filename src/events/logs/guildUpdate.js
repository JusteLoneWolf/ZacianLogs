

module.exports = class {
    constructor(client) {
        this.client = client;
    }
    run(oldGuild,newGuild){
        require('../../Utils/Logs/handlerGuildUpdate')(this.client,oldGuild,newGuild)
    }
};