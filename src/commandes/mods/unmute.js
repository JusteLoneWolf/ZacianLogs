const Command = require("../../Base/Command");
const {HELPER } = require("../../Utils/Constant/CommandeHelper");

class Unmute extends Command {
    constructor(client) {
        super(client, HELPER.COMMANDS.MOD.UNMUTE)
    }

    async run(message, args,guildData) {

        let db = await this.client.guildDB.get(message.guild.id);
        let member = message.mentions.members.first();
        if (!this.client.utils.resolveUser(message, member, HELPER.COMMANDS.MOD.UNMUTE.permission)) return;
        let role = message.guild.roles.cache.find(r=> r.name === 'Mute' || r.id === guildData.settings.roles.mute);
        let reason = args.slice(1).join(" ") || "Aucune raison donnée";

        member = message.guild.member(member);
        console.log(guildData)
        member.roles.remove(role,reason).then(async ()=>{
            message.channel.send(`${member.user.username} a était unmute par ${message.author.username}`);
            for (let data = 0; data < guildData.members; data++){
                if(guildData.members[data] === member.id ){
                    guildData.members.splice(data,1)
                }
            }

            await this.client.dbmanager.updateGuild(message.guild, {members:guildData.members});


        })

    }
}

module.exports = Unmute;