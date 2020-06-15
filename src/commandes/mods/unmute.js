const Command = require("../../Base/Command");
const {HELPER } = require("../../Utils/Constant/CommandeHelper");

class Unmute extends Command {
    constructor(client) {
        super(client, HELPER.COMMANDS.MOD.UNMUTE)
    }

    async run(message, args,guildData) {
        let member = message.mentions.members.first();
        if (!this.client.utils.resolveUser(message, member, HELPER.COMMANDS.MOD.UNMUTE.permission)) return;
        let role = message.guild.roles.cache.find(r=> r.name === 'Mute' || r.id === guildData.settings.roles.mute);
        let reason = args.slice(1).join(" ") || "Aucune raison donnée";

        member = message.guild.member(member);
        member.roles.remove(role,reason).then(async ()=>{
            message.channel.send(`${member.user.username} a était unmute par ${message.author.username}`);
            let data = {
                mute :{
                    isMute:false,
                    StartTime:Date.now(),
                    muteList:guildData.members[member.id].mute.muteList
                }
            };
            guildData.members[member.id].mute.muteList[guildData.members[member.id].mute.muteList.length-1].endAt = Date.now();
            Object.assign(guildData.members[member.id],data);
            await this.client.dbmanager.updateGuild(message.guild, {members:guildData.members});
        })

    }
}

module.exports = Unmute;