const {
    ShardingManager
} = require('discord.js');
const Log = require('./src/Utils/Logger')
const Logger = new Log()

const manager = new ShardingManager("./main.js", {
    token: require('./option').config.token,
    totalShards: "auto",
    respawn: true
});


manager.on("shardCreate", () => {
    Logger.info('shard lancé')
});

manager.spawn().then(r => Logger.info("Tous les shards sont lancé !"))