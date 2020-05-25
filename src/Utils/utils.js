class Utils {
    constructor() {
        
    }

    parseMessage(content){
       return content.replace(/@(everyone|here)/g, '@\u200b$1').replace(/\u202e/g, '')
    }

    async fetchInvite(guild,db){
        let database = db.get(guild.id)
        await guild.fetchInvites().then(invite=>{
                database.invites ={}
                database.invites[guild.id] = invite
            db.set(guild.id,database)
        })
        return db
    }
}

module.exports = Utils;