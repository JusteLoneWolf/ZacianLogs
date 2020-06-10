
module.exports = class {
    constructor(client) {
        this.client = client;
    }

   async run(guild) {
        const newGuild= {
            id : guild.id
        };
        await this.client.dbmanager.createGuild(newGuild);
       this.client.logger.info(`Nouveau serveur -> ${guild.name}`)
    }
};