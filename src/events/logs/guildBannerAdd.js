module.exports = async (client, oldGuild, newGuild) => {
    if (!newGuild.guild.me.permissions.has(["SEND_MESSAGES", "VIEW_AUDIT_LOG", "EMBED_LINKS", "MANAGE_CHANNELS", "MANAGE_GUILd"], true)) return;

    let db = await client.dbmanager.getGuild(newGuild);
    if (!db) return;
    let channel = newGuild.channels.cache.get(db.channels.log);
    if (!channel) return;

    return channel.send({
        embed: {
            title: "Serveur Logs",
            description: "La guild vient de changé de region",
            color: 0xF5AD2E,
            fields: [{
                    name: "❱ Ancienne Region",
                    value: oldGuild.bannerURL() ? oldGuild.bannerURL() : "Pas de banniere"
                },
                {
                    name: "❱ Nouvelle Region",
                    value: newGuild.bannerURL() ? newGuild.bannerURL() : "Pas de banniere"
                }
            ]
        }
    })
};
