

module.exports = class {
    constructor(client) {
        this.client = client;
    }
    run(oldChannel,newChannel){
        require('../../Utils/Logs/handlerGuildChannel')(this.client,oldChannel,newChannel)
    }
};