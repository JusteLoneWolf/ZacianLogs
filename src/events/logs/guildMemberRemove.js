module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async run(member){
        if(!member.guild.me.permissions.has(["SEND_MESSAGES", "VIEW_AUDIT_LOG", "EMBED_LINKS","MANAGE_CHANNELS","MANAGE_GUILD"], true)) return;


        let db = await this.client.dbmanager.getGuild(member.guild);
        if(!db) return;
            const botPerms = member.guild.me.permissions.has(["SEND_MESSAGES", "VIEW_AUDIT_LOG", "EMBED_LINKS"], true);
           if (botPerms) {
                const logChannel = member.guild.channels.cache.get(db.channels.log);
                if(!logChannel) return;
                const tempTimestamp = Date.now();

                const aLogFound = await member.guild.fetchAuditLogs({
                    type: "MEMBER_KICK",
                    limit: 1
                }).then(aLog => aLog.entries.first()).catch((err) =>{
                    this.client.emit("error",err)
                });

                if (aLogFound) {
                    const uTarget = aLogFound.target;

                    const aLogTimestamp = aLogFound.createdTimestamp;
                    if (tempTimestamp <= aLogTimestamp + 10000) {
                        if (uTarget.id !== member.id && logChannel) {
                            return logChannel.send({
                                embed: {
                                    title:"Un membre est parti",
                                    fields:[{
                                        name:"❱ Utilisateur",
                                        value:member.user.username
                                    }]
                                }
                            });
                        } else if (uTarget.id === member.id) {

                            const executor = await member.guild.fetchAuditLogs({
                                type: "MEMBER_KICK",
                                limit: 1
                            }).then(aLog => aLog.entries.first().executor).then(user => user.username).catch((err) =>{
                                this.client.emit("error",err)
                            });
                           return logChannel.send({
                                embed: {
                                    title:"Aurevoir Logs",
                                    description:"Un membre est parti",
                                    fields:[
                                        {
                                            name:"❱ Utilisateur Kick",
                                            value:member.user.username
                                        },
                                        {
                                            name:"❱ Moderateur",
                                            value: executor
                                        },
                                    ]
                                }
                            });
                        }
                    } else{
                         return logChannel.send({
                            embed: {
                                title:"Aurevoir Logs",
                                description:"Un membre est parti",
                                fields:[{
                                    name:"❱ Utilisateur",
                                    value:member.user.username
                                }]
                            }
                        });
                    }
                } else {
                        return logChannel.send({
                            embed: {
                                title:"Aurevoir Logs",
                                description:"Un membre est parti",
                                fields:[{
                                    name:"Utilisateur",
                                    value:member.user.username
                                }]
                            }
                        });
                }
            }
    }
};