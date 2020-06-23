class Utils {

    parseMessage(content){
       return content.replace(/@(everyone|here)/g, "@\u200b$1").replace(/\u202e/g, "")
    }

    async fetchInvite(client,guild,db){
        try{
            await guild.fetchInvites().then(async invite=>{


                if(!db.invites[invite.code]){
                    db.invites[invite.code] ={}
                    await client.dbmanager.updateGuild(guild, {invites:db.invites});

                }

                let inviteData = {}
                inviteData[guild.id] = invite;

                Object.assign(db.invites,inviteData)
                await client.dbmanager.updateGuild(guild, {invites:db.invites});
            }).catch((err)=>{
                console.error(err)
            })
            //TODO FIX getInvitation for guildMemberAdd event log
        }catch (e) {
            console.error(e)
        }

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
            if(user.role.highest >= message.guild.member(message.member).roles.highest){
                message.channel.send("Le member mentionné a un role plus haut que toi");
                return false
            }
        }
        return true
    }
}

module.exports = Utils;