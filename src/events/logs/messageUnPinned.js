module.exports = async (client, newMessage) => {

    if (!newMessage.guild.me.permissions.has(["SEND_MESSAGES", "VIEW_AUDIT_LOG", "EMBED_LINKS", "MANAGE_CHANNELS", "MANAGE_GUILd"], true)) return;

    let db = await client.dbmanager.getGuild(newMessage.guild);
    if (!db) return;
    let channel = newMessage.guild.channels.cache.get(db.channels.log);

    if (!channel) return;
    let content = newMessage.content;
    if (content.length > 1024) {
        content = newMessage.content.substr(0, 1000);
        content = content + "\n Trop long..."
    }

    return channel.send({
        embed: {
            title: "Message Logs",
            description: "Un message vient d'etre désépinglé",
            color: 0xF5AD2E,
            fields: [{
                    name: "❱ Utilisateur",
                    value: newMessage.member.user.username
                },
                {
                    name: "❱ Message",
                    value: content
                },
            ]
        }
    })
};
