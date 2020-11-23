const Command = require("../../Base/Command");
const {
    HELPER
} = require("../../Utils/Constant/CommandeHelper");
const moment = require('moment');

class Mute extends Command {
    constructor(client) {
        super(client, HELPER.COMMANDS.MOD.MUTE);
        this.client = client

    }

    async run(message, args, guildData) {
        let member = message.mentions.members.first();
        if (!this.client.utils.resolveUser(message, member, HELPER.COMMANDS.MOD.MUTE.permission)) return;
        let role = message.guild.roles.cache.find(r => r.name === 'Mute' || r.id === guildData.settings.roles ? guildData.settings.roles.mute : false);
        let reason = args.slice(1).join(" ") || "Aucune raison donnée";

        if (!role) {
            await message.guild.roles.create({
                data: {
                    name: "Mute",
                    color: "#414141",
                }

            }).then((roleCreate) => {
                role = roleCreate;
            })
        }

        await role.setPermissions(0);
        for (const channel of message.guild.channels.cache.array()) {
            if (channel.permissionsFor(role).has("SEND_MESSAGES") && channel.permissionsFor(role).has("ADD_REACTIONS")) {
                await channel.overwritePermissions([{
                    id: role.id,
                    deny: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                }], reason)
            }
        }
        if (member.roles.cache.find(muterole => muterole === role)) return message.channel.send(`${member.user.username} est deja mute`);

        member = message.guild.member(member);

        member.roles.add(role).then(async () => {
            message.channel.send(`${member.user.username} a était mute par ${message.author.username}`);

            if (!guildData.members[member.id]) {
                guildData.members[member.id] = {};
                await this.client.dbmanager.updateGuild(message.guild, {
                    members: guildData.members
                });
            }
            let data = {
                mute: {
                    isMute: true,
                    muteList: guildData.members[member.id].mute ? guildData.members[member.id].mute.muteList : []
                }
            };
            let muteData = {
                startAt: moment.utc(Date.now()).format('DD/MM/YYYY HH:mm:ss'),
                endAt: null,
                reason: reason
            };
            data.mute.muteList.push(muteData);
            Object.assign(guildData.members[member.id], data);

            await this.client.dbmanager.updateGuild(message.guild, {
                members: guildData.members
            });
            guildData.settings.roles.mute = role.id;
            await this.client.dbmanager.updateGuild(message.guild, {
                settings: guildData.settings
            });
        })
    }
}
module.exports = Mute;