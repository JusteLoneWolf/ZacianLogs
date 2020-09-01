const {WebhookClient} = require('discord.js');


module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async run(guild){
        if(process.env.WHSERVERLOG.length !== 0) {
            const log = new WebhookClient('745583452312829983',process.env.WHSERVERLOG);
            await log.send(`Le serveur ${guild.name} a ajouté le bot il posséde ${guild.memberCount}`)
        }
    }
};