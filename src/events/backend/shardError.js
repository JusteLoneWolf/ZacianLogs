module.exports = (error,shardID)=>{
        if(!this.client.shard) return;
        this.client.logger.info(`[SHARD] Shard ${shardID} in error\n${error}`)
};