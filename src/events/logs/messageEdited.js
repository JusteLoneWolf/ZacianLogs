module.exports = async (client, oldMessage, newMessage) => {

    if (!newMessage.guild.me.permissions.has(["SEND_MESSAGES", "VIEW_AUDIT_LOG", "EMBED_LINKS", "MANAGE_CHANNELS", "MANAGE_GUILD"], true)) return;

    if (newMessage.author.bot) return;
    let db = await client.dbmanager.getGuild(newMessage.guild);
    if (!db) return;
    let channel = newMessage.guild.channels.cache.get(db.channels.log);
    if (!channel) return;

    let contentold = oldMessage.content;
    if (contentold.length > 1024) {
        contentold = oldMessage.content.substr(0, 1000);
        contentold = contentold + "\n Trop long..."
    }
    let contentnew = newMessage.content;
    if (contentnew.length > 1024) {
        contentnew = oldMessage.content.substr(0, 1000);
        contentnew = contentnew + "\n Trop long..."
    }
    return channel.send({
        embed: {
            title: "Message Logs",
            description: "Un membre vient de mettre a jours son message",
            color: 0xF5AD2E,
            fields: [{
                    name: "❱ Utilisateur",
                    value: newMessage.member.user.username
                },
                {
                    name: "❱ Ancien message",
                    value: contentold
                },
                {
                    name: "❱ Nouveau message",
                    value: contentnew
                }
            ]
        }
    })
};