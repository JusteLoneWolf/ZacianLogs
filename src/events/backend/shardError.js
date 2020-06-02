module.exports = class {
    constructor(client) {
        this.client = client;
    }
    run(error,shardID){
        if(!this.client.shard) return;
        this.client.logger.info(`[SHARD] Shard ${shardID} in error\n${error}`)
    }
};