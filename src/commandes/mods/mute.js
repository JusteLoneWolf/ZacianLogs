const Command = require("../../Base/Command");
const {HELPER } = require("../../Utils/Constant/CommandeHelper");

class Mute extends Command {
    constructor(client) {
        super(client, HELPER.COMMANDS.MOD.MUTE)
    }

    async run(message, args) {

        let db = this.client.guildDB.get(message.guild.id)
        let member = message.mentions.members.first()
        if (!this.client.utils.resolveUser(message, member, HELPER.COMMANDS.MOD.MUTE.permission)) return
        let channels = message.guild.channels.cache.array()
        let role = message.guild.roles.cache.find(r=> r.name === 'Mute' || r.id === db.roles.mute)

        if(!role) {
            message.guild.role.create({
                name: "Muted",
                color: "#414141",
            }).then((roleCreate) => {
                role = roleCreate
            })
            db.roles.mute = role.id
            this.client.guildDB.set(message.guild.id, db)
        }

        for (const channel of channels) {
            await channel.overwritePermissions(role, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            })
        }
        member = message.guild.member(member)
        member.roles.add(role).then(()=>{
            message.channels.send(`${member.user.username} a était mute par ${message.author.username}`)
            db.members[member.id] ={}
            db.members[member.id].mute = true
            this.client.guildDB.set(message.guild.id,db)
        })

    }
}

module.exports = Mute;