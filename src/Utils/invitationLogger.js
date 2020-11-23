module.exports = async (client, message) => {

    if (!message.guild.me.permissions.has(["SEND_MESSAGES", "VIEW_AUDIT_LOG", "EMBED_LINKS", "MANAGE_CHANNELS", "MANAGE_GUILD"], true)) return;

    let db = await client.dbmanager.getGuild(message.guild);
    if (!db) return;
    let channel = message.guild.channels.cache.get(db.channels.log);
    if (!channel) return;

    if (message.content.match(/(discord\.gg|discord\.com\/invite)\/.+/)) {
        for (const invitation of message.content.split(' ')) {
            if (message.content.match(/(discord\.gg|discord\.com\/invite)\/.+/)) {
                client.fetchInvite(invitation).then(invite => {
                    return channel.send({
                        embed: {
                            title: "Invitation Logs",
                            description: "Une invitation a etait posté",
                            fields: [{
                                    name: "Nom du serveur de l'invitation",
                                    value: invite.guild.name
                                },
                                {
                                    name: "Nom du channel de l'invitation",
                                    value: invite.channel
                                },
                                {
                                    name: "Nom du createur de l'invitation",
                                    value: invite.inviter ? invite.inviter.username : 'Pas trouvé'
                                },
                                {
                                    name: "L'invitation",
                                    value: invitation
                                }
                            ]
                        }
                    })
                })
            }
        }
    }
};