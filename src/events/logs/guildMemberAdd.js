module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async run(member){
        let db = this.client.guildDB.get(member.guild.id,'channels.logs');
        const channel = member.guild.channels.cache.get(db)
        if(!channel) return
        const fetchLog = await member.guild.fetchAuditLogs({
            limit:1,
            type:'MEMBER_KICK'
        });


    let kicklogs = fetchLog.entries.first()
        if(!kicklogs){
            channel.send({
                embed:{
                    title:'Un membre est parti',
                    fields:[{
                        name:'Utilisateur',
                        value:member.user.username
                    }]
                }
            })
        }
    }
}