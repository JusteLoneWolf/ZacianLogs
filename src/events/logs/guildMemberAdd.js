
module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(member) {
        let db = this.client.guildDB.get(member.guild.id);
        const logChannel = member.guild.channels.cache.find(channel => channel.id === db.channels.logs);
        if (!logChannel) return;

        member.guild.fetchInvites().then(guildInvites => {
            const ei = db.invites[member.guild.id];
            console.log(ei.fetch())

            const invite = guildInvites.find(i =>
                ei.get(i.code) ?
                ei.get(i.code).uses < i.uses
                : 0 < i.uses
            );

            const inviter = invite? member.guild.members.cache.get(invite.inviter.id): false;


            logChannel.send({
                embed: {
                    title: 'Un membre est arrivé',
                    fields:[{
                        name:'❱ Invitation',
                        value: invite? `\`${invite.code}\` par **${inviter.username}** avec **${invite.uses}** utilisations` : 'Invitation non trouvé'
                    }]
                }
            }).catch((err)=>{
                this.client.emit('error',err)
            })
        }).catch((err)=>{
            this.client.emit('error',err)
        })
    }
};

// a fini ptdr tous est peté