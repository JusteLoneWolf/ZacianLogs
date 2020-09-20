

module.exports = class {
    constructor(client) {
        this.client = client;
    }
    run= async (oldGuild,newGuild) => {

        if(!newGuild.me.permissions.has(["SEND_MESSAGES", "VIEW_AUDIT_LOG", "EMBED_LINKS","MANAGE_CHANNELS","MANAGE_GUILD"], true)) return;


        let db = await this.client.dbmanager.getGuild(newGuild);
        if (!db) return;
        let channel = newGuild.guild.channels.cache.get(db.channels.log);
        if (!channel) return;

        return channel.send({
            embed: {
                title: "Serveur Logs",
                description: "La guild vient de changé de region",
                color: 0xF5AD2E,
                fields: [
                    {
                        name: "❱ Ancienne Region",
                        value: oldGuild.region
                    },
                    {
                        name: "❱ Nouvelle Region",
                        value: newGuild.region
                    }
                ]
            }
        })
    }
};