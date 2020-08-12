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

        async function invite(client,guild) {
                try {
                    console.log('Collecte des invitation en cours '+guild)
                    if( client.guilds.cache.get(guild).members.cache.get(client.user.id).hasPermission('MANAGE_GUILD')) {
                        let guildDataInvite = client.guilds.cache.get(guild);
                        let guildData = await client.dbmanager.getGuild(guild)
                        if (guildData) {
                            await client.utils.fetchInvite(client,guildDataInvite, guildData).then(() => {
                                client.logger.info(`Toutes les invitation get ${guild}`);
                            }).catch((err) => {
                                this.client.emit("error", err);
                            });
                        }else{
                            client.logger.error(`Aucune invitation get ${guild} (pas de base de donnée)`);
                        }
                    }else{
                        client.logger.error(`Aucune invitation get ${guild} (manque de permission)`);
                    }
                } catch (err) {
                    this.client.emit("error", err);
                }

        }

        for (const guild of this.client.guilds.cache) {
            await sleep(200)

            await invite(this.client, guild[0])
        }

        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }
        this.client.logger.info(`${this.client.user.username} pret`);
        require('../../Utils/statsChannels').init(this.client)


    }
};