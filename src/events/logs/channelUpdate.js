

module.exports = class {
    constructor(client) {
        this.client = client;
    }
    run(oldChannel,newChannel){
        console.log(oldChannel.type);
        require('../../Utils/Logs/handlerGuildChannel')(this.client,oldChannel,newChannel)
    }
};