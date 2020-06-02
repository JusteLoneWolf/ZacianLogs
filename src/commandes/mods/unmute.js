const Command = require("../../Base/Command");
const {HELPER } = require("../../Utils/Constant/CommandeHelper");

class Unmute extends Command {
    constructor(client) {
        super(client, HELPER.COMMANDS.MOD.UNMUTE)
    }

    async run(message, args) {

        let db = this.client.guildDB.get(message.guild.id);
        let member = message.mentions.members.first();
        if (!this.client.utils.resolveUser(message, member, HELPER.COMMANDS.MOD.UNMUTE.permission)) return;
        let role = message.guild.roles.cache.find(r=> r.name === 'Mute' || r.id === db.settings.roles.mute);
        let reason = args.slice(1).join(" ") || "Aucune raison donnée";

        member = message.guild.member(member);
        member.roles.remove(role,reason).then(()=>{
            message.channel.send(`${member.user.username} a était unmute par ${message.author.username}`);
            for (let data = 0; data < db.members; data++){
                if(db.members[data] === member.id ){
                    db.members.splice(data,1)
                }
            }
            this.client.guildDB.set(message.guild.id,db)
        })

    }
}

module.exports = Unmute;