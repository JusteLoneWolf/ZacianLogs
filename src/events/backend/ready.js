module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async run(){

            await this.client.user.setPresence({
                activity: {
                    name: `${this.client.config.prefix}help `,
                    type: "LISTENING"
                }
            }).then(()=>console.log('Status set !'));
        let selector = 0;

        for (const guild of this.client.guilds.cache) {
            let guildData = this.client.guilds.cache.get(guild[selector]);
            if(!this.client.guildDB.get(guild[selector])) continue;
            await this.client.utils.fetchInvite(guildData,this.client.guildDB).then(()=>{
                console.log(`Toutes les invitation get ${guild[selector]}`);
                selector++
            }).catch((err)=>{
                console.error(err)
            });
        }
        this.client.logger.info(`${this.client.user.username} pret`)


    }
};