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

        //require('../../modules/dashboard')(this.client)


        this.client.guilds.cache.map(async guild => {

            try {
               if( this.client.guilds.cache.get(guild.id).members.cache.get(this.client.user.id).hasPermission('MANAGE_GUILD')) {
                   let guildData = this.client.guilds.cache.get(guild.id);
                   if (this.client.guildDB.get(guild.id)) {
                       await this.client.utils.fetchInvite(guildData, this.client.guildDB).then(() => {
                           this.client.logger.error(`Toutes les invitation get ${guild.id}`);
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

        this.client.logger.info(`${this.client.user.username} pret`)



    }
};