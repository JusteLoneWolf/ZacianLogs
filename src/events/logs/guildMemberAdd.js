
module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(member) {
        let db = this.client.guildDB.get(member.guild.id);

        if(!db.members[member.id]){
            if(!db.members[member.id].mute){
                let role = member.guild.roles.cache.find(r=> r.name === 'Mute' || r.id === db.settings.roles.mute)
                if(!role) {
                    member.guild.role.create({
                        name: "Muted",
                        color: "#414141",
                    }).then((roleCreate) => {
                        role = roleCreate
                    })
                }
                let channels = member.guild.channels.cache.array()
                for (const channel of channels) {
                    await channel.overwritePermissions([
                        {
                            id:role.id,
                            deny:["SEND_MESSAGES","ADD_REACTIONS"]
                        }
                    ])
                }
                let toMute = member.guild.member(member)
                toMute.roles.add(role).then(()=>{
                    db.settings.roles.mute = role.id
                    db.members[member.id] ={}
                    db.members[member.id].mute = true
                    this.client.guildDB.set(member.guild.id,db)
                })
            }
        }
        const logChannel = member.guild.channels.cache.find(channel => channel.id === db.channels.logs);
        if (!logChannel) return;

        member.guild.fetchInvites().then(guildInvites => {
            const ei = db.invites[member.guild.id];
            const invite = guildInvites.find(i =>
                ei.get(i.code) ?
                ei.get(i.code).uses < i.uses
                : 0 < i.uses
            );

            const inviter = invite? member.guild.members.cache.get(invite.inviter.id): false;

            logChannel.send({
                embed: {
                    title: "Un membre est arrivé",
                    fields:[
                        {
                            name: "Membres",
                            value: member.user.username
                        },
                        {
                            name:"Invitation",
                            value: invite? `\`${invite.code}\` par **${inviter.user.username}** avec **${invite.uses}** utilisations` : "Invitation non trouvé"
                        }
                        ]
                }
            }).catch((err)=>{
                this.client.emit("error",err)
            })
        }).catch((err)=>{
            this.client.emit("error",err)
        })
    }
};

// a fini ptdr tous est peté