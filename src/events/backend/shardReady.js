module.exports = (client, id) => {
    if (!client.shard) return;
    client.logger.info(`[SHARD] Shard ${id} pret`)
};