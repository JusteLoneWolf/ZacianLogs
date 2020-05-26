module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(invite) {
        const moment = require('moment');
        require('moment-duration-format');
        moment.locale('fr');
        let db = this.client.guildDB.get(invite.guild.id, 'channels.logs');

        this.client.utils.fetchInvite(invite.guild, this.client.guildDB).then(async ()=>{
            const logChannel = invite.guild.channels.cache.find(channel => channel.id === db);
            if (!logChannel) return;

            const aLogFound = await invite.guild.fetchAuditLogs({
                type: 'INVITE_DELETE',
                limit: 1
            }).then(aLog => aLog.entries.first()).catch((err) => {
                this.client.emit('error', err)
            });

            let changes = aLogFound.changes;
            console.log(aLogFound)

            logChannel.send({
                embed: {
                    title: 'Une invitation a etait supprimé',
                    fields: [
                        {
                            name: '❱ Code',
                            value: changes[0].old
                        },
                        {
                            name: '❱ Supprimé Par',
                            value: aLogFound.executor.username
                        },
                        {
                            name: '❱ Channel',
                            value: changes[1].old
                        },
                        {
                            name: '❱ Utilisation maximal',
                            value: changes[4].old
                        },
                        {
                            name: '❱ Expiration',
                            value: changes[5].old === 0 ? 'Infinie': changes[5].old+' secondes'
                        },
                        {
                            name: '❱ Met le status membre provisoire',
                            value: changes[6].old
                        }]
                }
            })
        })
    }
};