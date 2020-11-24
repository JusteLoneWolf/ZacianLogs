module.exports = async (client, channel) => {
    if (!channel.guild.me.permissions.has(["SEND_MESSAGES", "VIEW_AUDIT_LOG", "EMBED_LINKS", "MANAGE_CHANNELS", "MANAGE_GUILD"], true)) return;

    if (channel.type === "dm") return;
    let db = await client.dbmanager.getGuild(channel.guild);
    if (!db) return;
    let channeldb = channel.guild.channels.cache.get(db.channels.log);
    if (!channeldb) return;
    const aLogFound = await channel.guild.fetchAuditLogs({
        type: "CHANNEL_CREATE",
        limit: 1
    }).then(aLog => aLog.entries.first()).catch((err) => {
        client.emit("error", err)
    });

    return channeldb.send({
        embed: {
            title: "Channel Logs",
            description: "Un channel vien d'etre créer",
            color: 0xF5AD2E,
            fields: [{
                    name: "❱ Créer par",
                    value: aLogFound ? aLogFound.executor.username : "Pas d'information recuperé"
                },
                {
                    name: "❱ Nom du channel",
                    value: aLogFound ? aLogFound.changes[0].new : "Pas d'information recuperé"
                },
                /*{
                    name:"❱ Permission",
                    value : aLogFound.changes[2].new.map(role => channel.guild.roles.cache.get(aLogFound.changes[2].new))
                },*/
                {
                    name: "❱ NSFW",
                    value: aLogFound ? aLogFound.changes[3].new ? "Oui" : "Non" : "Pas d'information recuperé"
                }
            ]
        }
    })
}
