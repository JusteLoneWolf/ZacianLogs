const Command = require("../../Base/Command");
const {HELPER } = require("../../Utils/Constant/CommandeHelper");

class Mute extends Command {
    constructor(client) {
        super(client, HELPER.COMMANDS.MOD.MUTE)
    }

    async run(message, args,guildData) {
        let member = message.mentions.members.first();
        if (!this.client.utils.resolveUser(message, member, HELPER.COMMANDS.MOD.MUTE.permission)) return;
        console.log(guildData)
        let role = message.guild.roles.cache.find(r => r.name === 'Mute' || r.id === guildData.settings.roles? guildData.settings.roles.mute : false);
        let reason = args.slice(1).join(" ") || "Aucune raison donnée";

        if (!role) {
            await message.guild.roles.create({
                data:{
                    name: "Mute",
                    color: "#414141",
                }

            }).then((roleCreate) => {
                role = roleCreate
                console.log(role)
            })
        }
        await role.setPermissions(0);
        for (const channel of message.guild.channels.cache.array()) {
            if (channel.permissionsFor(role).has("SEND_MESSAGES") && channel.permissionsFor(role).has("ADD_REACTIONS")) {
                await channel.overwritePermissions([
                    {
                        id: role.id,
                        deny: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                    }
                ],reason)
            }
        }

        member = message.guild.member(member);
        member.roles.add(role).then(async () => {
            message.channel.send(`${member.user.username} a était mute par ${message.author.username}`);
            let settings = {
                punishment: {
                    enabled: guildData.settings.punishment.enabled,
                    mute: guildData.settings.punishment.mute,
                    kick: guildData.settings.punishment.kick,
                    ban: guildData.settings.punishment.ban,
                },
                roles: {
                    mute: guildData.settings.roles.mute
                },
                welcome: {
                    enabled: guildData.settings.welcome.enabled,
                    autorole: guildData.settings.welcome.autorole,
                    capchat: {
                        unverifiedRole: guildData.settings.welcome.capchat.unverifiedRole,
                        channel: guildData.settings.welcome.capchat.channel,
                        enabled: guildData.settings.welcome.capchat.enabled
                    },
                }
            }
            let members = [];
            settings.roles.mute = role.id;
            members[member.id]= {
                mute : true
            }
            await this.client.dbmanager.updateGuild(message.guild, {settings:settings});
            await this.client.dbmanager.updateGuild(message.guild, {members:members });

        })

    }
}
//TODO Fix mute

module.exports = Mute;