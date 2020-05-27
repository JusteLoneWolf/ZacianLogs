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
    }

    resolveUser(message,member){
        if(!member) {
            message.channel.send('Tu doit mentionné un utilisateur')
            return false
        }
        if(member.id === message.author.id){
            message.channel.send('Tu ne peux pas faire ça sur toi même')
            return false
        }
        if(member.id === message.guild.ownerID){
            message.channel.send('Tu ne peux pas faire ça sur toi même')
            return false
        }

        member = message.guild.member(member)

        if(message.author.id !== message.guild.ownerID){
            if(member.role.highest >= message.guild.member(message.member).role.highest){
                message.channel.send('Le member mentionné a un role plus haut que toi')
                return false
            }
        }
        return true
    }
}

module.exports = Utils;