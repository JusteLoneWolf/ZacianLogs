
module.exports = class {
    constructor(client) {
        this.client = client;
    }

   async run(guild) {
        const newGuild= {
            GuildId : guild.id
        };
        await this.client.dbmanager.createGuild(newGuild);
       this.client.logger.info(`Nouveau serveur -> ${guild.name}`);


       let data = await this.client.dbmanager.getGuild(guild);


       await this.client.utils.fetchInvite(guild,data).then(()=>{
           console.log(`Toutes les invitation get ${guild.id}`);
       }).catch((err)=>{
           console.error(err)
       });
    }
};