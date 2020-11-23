module.exports = async (client, guild) => {
    if (process.env.WHSERVERLOG.length !== 0) {
        const {
            WebhookClient
        } = require("discord.js");

        const log = new WebhookClient(745583452312829983, process.env.WHSERVERLOG);
        await log.send({
            embed: {
                title: "Nouveau serveur ajouté",
                description: `Le serveur ${guild.name} a supprimé le bot il posséde ${guild.memberCount}`
            }
        })
    }
};
