

module.exports = async (client,oldGuild,newGuild) => {
    if (!newGuild.guild.me.permissions.has(["SEND_MESSAGES", "VIEW_AUDIT_LOG", "EMBED_LINKS", "MANAGE_CHANNELS", "MANAGE_GUILD"], true)) return;

    let db = await client.dbmanager.getGuild(newGuild);
    if (!db) return;
    let channel = newGuild.channels.cache.get(db.channels.log);
    if (!channel) return;

    return channel.send({
        embed: {
            title: "Serveur Logs",
            description: "La guild vient de changé de salon afk",
            color: 0xF5AD2E,
            fields: [
                {
                    name: "❱ Ancienne Region",
                    value: oldGuild.afkChannel ? oldGuild.afkChannel : "Pas de channel AFK"
                },
                {
                    name: "❱ Nouvelle Region",
                    value: newGuild.afkChannel ? newGuild.afkChannel : "Pas de channel AFK"
                }
            ]
        }
    })
};