module.exports = (id)=> {
        if(!this.client.shard) return;
        this.client.logger.info(`[SHARD] Shard ${id} reconnection`)
};