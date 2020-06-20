module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(invite) {
        if(!invite.guild.me.permissions.has(["SEND_MESSAGES", "VIEW_AUDIT_LOG", "EMBED_LINKS","MANAGE_CHANNELS","MANAGE_GUILD"], true)) return;

        let db = await this.client.dbmanager.getGuild(invite.guild);
        if(!db) return;
        let logChannel = invite.guild.channels.cache.get(db.channels.log);
        if (!logChannel) return;
        const moment = require("moment");
        require("moment-duration-format");
        moment.locale("fr");

        this.client.utils.fetchInvite(invite.guild, this.client.guildDB).then(async ()=>{


            const aLogFound = await invite.guild.fetchAuditLogs({
                type: "INVITE_CREATE",
                limit: 1
            }).then(aLog => aLog.entries.first()).catch((err) => {
                this.client.emit("error", err)
            });
            return logChannel.send({
                embed: {
                    title:"Invitation Logs",
                    description: "Une invitation a etait créer",
                    fields: [
                        {
                            name: "❱ Code",
                            value: aLogFound.changes[0].new
                        },
                        {
                            name: "❱ Par",
                            value: aLogFound.executor.username
                        },
                        {
                            name: "❱ Channel",
                            value: aLogFound.changes[1].new
                        },
                        {
                            name: "❱ Utilisation maximal",
                            value: aLogFound.changes[4].new
                        },
                        {
                            name: "❱ Expiration",
                            value: aLogFound.changes[5].new === 0 ? "Infinie": aLogFound.changes[5].new+" secondes"
                        },
                        {
                            name: "❱ Met le status membre provisoire",
                            value: aLogFound.changes[6].new
                        }]
                }
            })
        })
    }
};