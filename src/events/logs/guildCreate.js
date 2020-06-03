
module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(guild) {
            this.client.emit('createDatabase',guild);

        await this.client.utils.fetchInvite(guild,this.client.guildDB).then(()=>{
            console.log(`Toutes les invitation get ${guild.id}`);
        }).catch((err)=>{
            console.error(err)
        });

    }
};