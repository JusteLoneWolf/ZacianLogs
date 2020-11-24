module.exports = async (client, member) => {

    if (!member.guild.me.permissions.has(["SEND_MESSAGES", "VIEW_AUDIT_LOG", "EMBED_LINKS", "MANAGE_CHANNELS", "MANAGE_GUILD"], true)) return;

    let db = await client.dbmanager.getGuild(member.guild);
    if (!db) return;
    let channel = member.guild.channels.cache.get(db.channels.log);

    if (!channel) return;

    return channel.send({
        embed: {
            title: "Boost Logs",
            description: "Un membre vient de unboost",
            color: 0xF5AD2E,
            fields: [{
                name: "❱ Utilisateur",
                value: member.user.username
            }, ]
        }
    })
};
