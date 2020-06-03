

module.exports = class {
    constructor(client) {
        this.client = client;
    }
    run(oldChannel,newChannel){
        console.log(1)
        if(newChannel.type ==="dm") return
        require('../../Utils/Logs/handlerGuildUpdate')(this.client,oldChannel,newChannel)
    }
};