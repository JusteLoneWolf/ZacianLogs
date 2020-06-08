module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run() {

        await this.client.user.setPresence({
            activity: {
                name: `${this.client.config.prefix}help `,
                type: "LISTENING"
            }
        }).then(() => this.client.logger.info('Status set !'));

        this.client.guilds.cache.map(async guild => {

            try {
               if( this.client.guilds.cache.get(guild.id).members.cache.get(this.client.user.id).hasPermission('MANAGE_GUILD')) {
                   let guildData = this.client.guilds.cache.get(guild.id);
                   if (this.client.guildDB.get(guild.id)) {
                       await this.client.utils.fetchInvite(guildData, this.client.guildDB).then(() => {
                           this.client.logger.info(`Toutes les invitation get ${guild.id}`);
                       }).catch((err) => {
                           this.client.emit("error", err);
                       });
                   }else{
                       this.client.logger.error(`Aucune invitation get ${guild.id} (pas de base de donnée)`);
                   }
               }else{
                   this.client.logger.error(`Aucune invitation get ${guild.id} (manque de permission)`);
               }
            } catch (err) {
                this.client.emit("error", err);
            }
        });
        if(this.client.ws.shards.find(shard => shard.id ===this.client.shard.count-1)){
            require('../../modules/dashboard')(this.client)
            await getShardData(this.client);
            setInterval(async()=>{
                await getShardData(this.client)
            },60000)


        }
        async function getShardData(client) {
            const shardsInfo = await client.shard.broadcastEval(`let shardInfoArr = []; shardInfoArr.push(this.users.cache.size); shardInfoArr.push(this.guilds.cache.size); shardInfoArr.push(this.uptime); shardInfoArr.push(Math.trunc((process.memoryUsage().heapUsed) / 1024 / 1000)); shardInfoArr;`);
            client.dataShard = []

            for(let e = 0; e<shardsInfo.length;e++){
                client.dataShard.push({
                    user: shardsInfo[e][0],
                    guild: shardsInfo[e][1],
                    uptime: shardsInfo[e][2],
                    ram: shardsInfo[e][3],
                })
            }
            return client.dataShard
        }

        this.client.logger.info(`${this.client.user.username} pret`)



    }
};