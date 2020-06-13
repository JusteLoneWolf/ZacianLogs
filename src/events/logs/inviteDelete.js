module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(invite) {
        let db = await this.client.dbmanager.getGuild(invite.guild)
        if(!db) return;
        let logChannel = invite.guild.channels.cache.get(db.channels.log)
        if (!logChannel) return;
        const moment = require("moment");
        require("moment-duration-format");
        moment.locale("fr");
        this.client.utils.fetchInvite(invite.guild, this.client.guildDB).then(async ()=>{


            const aLogFound = await invite.guild.fetchAuditLogs({
                type: "INVITE_DELETE",
                limit: 1
            }).then(aLog => aLog.entries.first()).catch((err) => {
                this.client.emit("error", err)
            });
            logChannel.send({
                embed: {
                    title:"Invitation Logs",
                    description: "Une invitation a etait supprimé",
                    fields: [
                        {
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
                            value: aLogFound.changes[5].old === 0 ? "Infinie": aLogFound.changes[5].old+" secondes"
                        },
                        {
                            name: "❱ Met le status membre provisoire",
                            value: aLogFound.changes[6].old
                        }]
                }
            })
        })
    }
};