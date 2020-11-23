const Command = require("../../Base/Command");
const {
    HELPER
} = require("../../Utils/Constant/CommandeHelper");
const moment = require("moment");

class Unmute extends Command {
    constructor(client) {
        super(client, HELPER.COMMANDS.MOD.UNMUTE);
        this.client = client

    }

    async run(message, args, guildData) {
        let member = message.mentions.members.first();
        if (!this.client.utils.resolveUser(message, member, HELPER.COMMANDS.MOD.UNMUTE.permission)) return;
        let role = message.guild.roles.cache.find(r => r.name === "Mute" || r.id === guildData.settings.roles.mute);
        let reason = args.slice(1).join(" ") || "Aucune raison donnée";

        member = message.guild.member(member);
        member.roles.remove(role, reason).then(async () => {
            message.channel.send(`${member.user.username} a était unmute par ${message.author.username}`);

            guildData.members[member.id].mute.muteList[guildData.members[member.id].mute.muteList.length - 1].endAt = moment.utc(Date.now()).format("DD/MM/YYYY HH:mm:ss");
            guildData.members[member.id].isMute = false;
            await this.client.dbmanager.updateGuild(message.guild, {
                members: guildData.members
            });
        })

    }
}

module.exports = Unmute;
