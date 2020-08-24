const {ShardingManager} = require('discord.js');

const manager = new ShardingManager("./main.js",{
   token: require('./option').config.token,
   totalShards: 2,
   respawn: true
});


manager.on("shardCreate",()=>{
    console.log('shard lancé')
});

manager.spawn().then(r => console.log("Tous les shards sont lancé !"))
