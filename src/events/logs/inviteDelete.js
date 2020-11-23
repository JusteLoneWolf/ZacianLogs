module.exports = async (client, invite) => {

    if (!invite.guild.me.permissions.has(["SEND_MESSAGES", "VIEW_AUDIT_LOG", "EMBED_LINKS", "MANAGE_CHANNELS", "MANAGE_GUILd"], true)) return;


    let db = await client.dbmanager.getGuild(invite.guild);
    if (!db) return;
    let logChannel = invite.guild.channels.cache.get(db.channels.log);
    if (!logChannel) return;
    const moment = require("moment");
    require("moment-duration-format");
    moment.locale("fr");
    client.utils.fetchInvite(client,invite.guild,db).then(async () => {


        const aLogFound = await invite.guild.fetchAuditLogs({
            type: "INVITE_DELETE",
            limit: 1
        }).then(aLog => aLog.entries.first()).catch((err) => {
            client.emit("error", err)
        });
        return logChannel.send({
            embed: {
                title: "Invitation Logs",
                description: "Une invitation a etait supprimé",
                fields: [{
                        name: "❱ Code",
                        value: aLogFound.changes[0].old
                    },
                    {
                        name: "❱ Supprimé Par",
                        value: aLogFound.executor.username
                    },
                    {
                        name: "❱ Channel",
                        value: aLogFound.changes[1].old
                    },
                    {
                        name: "❱ Utilisation maximal",
                        value: aLogFound.changes[4].old
                    },
                    {
                        name: "❱ Expiration",
                        value: aLogFound.changes[5].old === 0 ? "Infinie" : aLogFound.changes[5].old + " secondes"
                    },
                    {
                        name: "❱ Met le status membre provisoire",
                        value: aLogFound.changes[6].old
                    }
                ]
            }
        })
    })
};
