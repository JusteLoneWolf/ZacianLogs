module.exports = class {
    constructor(client) {
        this.client = client;
    }
    run(id){
        if(!this.client.shard) return;
        this.client.logger.info(`[SHARD] Shard ${id} pret`)
    }
};