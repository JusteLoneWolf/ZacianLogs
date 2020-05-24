module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(member) {
        let db = this.client.guildDB.get(member.guild.id, 'channels.logs');
        member.guild.fetchInvites().then(guildInvites => {
            const ei = invites[member.guild.id];
            const invite = guildInvites.find(i => ei.get(i.code) ? ei.get(i.code).uses < i.uses : 0 < i.uses);
            const inviter = client.users.get(invite.inviter.id);
            const logChannel = member.guild.channels.cache.find(channel => channel.id === db);
            if (!logChannel) return;

            logChannel.send({
                embed: {
                    title: 'Un membre est arrivé',
                    fields:[{
                        name:'Invitation',
                        value: invite? `\`${invite.code}\` par **${inviter.username}** avec **${invite.uses}** utilisations` : 'Invitation non trouvé'
                    }]
                }
            })
        }).catch((err)=>{
            this.client.emit('error',err)
        })
    }
};