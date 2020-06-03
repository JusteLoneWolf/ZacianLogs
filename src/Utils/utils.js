class Utils {

    parseMessage(content){
       return content.replace(/@(everyone|here)/g, "@\u200b$1").replace(/\u202e/g, "")
    }

    async fetchInvite(guild,db){
        let database = db.get(guild.id);
        await guild.fetchInvites().then(invite=>{
                database.invites ={};
                database.invites[guild.id] = invite;
            db.set(guild.id,database)
        }).catch((err)=>{
            console.error(err)
        })
    }

    resolveUser(message,member, permission){
        if(!message.member.permissions.has(permission,true)){
            message.channel.send(`Tu n\"as pas la permission d\"éxecute la commande (${permission})`);
            return false
        }

        if(!member) {
            message.channel.send("Tu doit mentionné un utilisateur");
            return false
        }
        if(member.id === message.author.id){
            message.channel.send("Tu ne peux pas faire ça sur toi même");
            return false
        }

        if(member.id === message.guild.ownerID){
            message.channel.send("Tu ne peux pas faire ca sur l'owner");
            return false
        }

        let user = message.guild.member(member);

        if(message.author.id !== message.guild.ownerID){
            if(user.role.highest >= message.guild.member(message.member).role.highest){
                message.channel.send("Le member mentionné a un role plus haut que toi");
                return false
            }
        }
        return true
    }
}

module.exports = Utils;