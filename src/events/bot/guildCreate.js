
module.exports = class {
    constructor(client) {
        this.client = client;
    }

   async run(guild) {
        const NewGuild= {
            GuildId : guild.id
        }
        await this.client.dbmanager.createGuild(NewGuild)
       this.client.logger.info(`Nouveau serveur -> ${guild.name}`)
    }
};