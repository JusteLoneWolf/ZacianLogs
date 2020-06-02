const {ShardingManager} = require('discord.js');

const manager = new ShardingManager("./main.js",{
   token: require('./option').config.token,
   totalShards: 1,
   respawn: true
});


manager.on("shardCreate",()=>{
    console.log('shard lancé')
});


manager.spawn();