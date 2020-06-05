const Command = require("../../Base/Command");
const {HELPER } = require("../../Utils/Constant/CommandeHelper");

class Mute extends Command {
    constructor(client) {
        super(client, HELPER.COMMANDS.MOD.MUTE)
    }

    async run(message, args) {

        let db = this.client.guildDB.get(message.guild.id);
        let member = message.mentions.members.first();
        if (!this.client.utils.resolveUser(message, member, HELPER.COMMANDS.MOD.MUTE.permission)) return;
        let role = message.guild.roles.cache.find(r => r.name === 'Mute' || r.id === db.settings.roles.mute);
        let reason = args.slice(1).join(" ") || "Aucune raison donnée";

        if (!role) {
            message.guild.role.create({
                name: "Muted",
                color: "#414141",
            }).then((roleCreate) => {
                role = roleCreate
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
        member.roles.add(role).then(() => {
            message.channel.send(`${member.user.username} a était mute par ${message.author.username}`);
            db.members[member.id] = {};
            db.settings.roles.mute = role.id;
            db.members[member.id].mute = true;
            this.client.guildDB.set(message.guild.id, db)
        })

    }
}

module.exports = Mute;