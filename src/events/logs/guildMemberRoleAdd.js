module.exports = async (client, newMember, role) => {

    if (!newMember.guild.me.permissions.has(["SEND_MESSAGES", "VIEW_AUDIT_LOG", "EMBED_LINKS", "MANAGE_CHANNELS", "MANAGE_GUILD"], true)) return;

    let db = await client.dbmanager.getGuild(newMember.guild);
    if (!db) return;
    let channel = newMember.guild.channels.cache.get(db.channels.log);
    if (!channel) return;

    return channel.send({
        embed: {
            title: "Role Logs",
            description: "Un membre a un nouveau role",
            color: 0xF5AD2E,
            fields: [{
                    name: "❱ Nouveau role",
                    value: role.name
                },
                {
                    name: "❱ Utilisateur",
                    value: newMember.user.username
                },
                {
                    name: "❱ Roles actuelle",
                    value: newMember.roles.cache.size > 0 ? newMember.roles.cache.filter(r => r.name !== "@everyone").map(roles => roles.name).join(", ") : "Aucun role"
                }
            ]
        }
    })
};