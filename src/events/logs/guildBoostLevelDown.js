

module.exports = async (client,oldGuild,newGuild) => {

    if (!newGuild.guild.me.permissions.has(["SEND_MESSAGES", "VIEW_AUDIT_LOG", "EMBED_LINKS", "MANAGE_CHANNELS", "MANAGE_GUILD"], true)) return;

    let db = await client.dbmanager.getGuild(newGuild);
    if (!db) return;
    let channel = newGuild.channels.cache.get(db.channels.log);
    if (!channel) return;

    return channel.send({
        embed: {
            title: "Boost Logs",
            description: "La guild vient de perdre un niveau",
            color: 0xF5AD2E,
            fields: [
                {
                    name: "❱ Ancien Niveau",
                    value: oldGuild.premiumTier
                },
                {
                    name: "❱ Nouveau Niveau",
                    value: newGuild.premiumTier
                }

            ]
        }
    })
};