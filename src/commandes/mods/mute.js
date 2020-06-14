const Command = require("../../Base/Command");
const {HELPER } = require("../../Utils/Constant/CommandeHelper");

class Mute extends Command {
    constructor(client) {
        super(client, HELPER.COMMANDS.MOD.MUTE)
    }

    async run(message, args,guildData) {
        let member = message.mentions.members.first();
        if (!this.client.utils.resolveUser(message, member, HELPER.COMMANDS.MOD.MUTE.permission)) return;
        let role = message.guild.roles.cache.find(r => r.name === 'Mute' || r.id === guildData.settings.roles? guildData.settings.roles.mute : false);
        let reason = args.slice(1).join(" ") || "Aucune raison donnée";

        if (!role) {
            await message.guild.roles.create({
                data:{
                    name: "Mute",
                    color: "#414141",
                }

            }).then((roleCreate) => {
                role = roleCreate;
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

           /* if(!guildData.members[member.id]){
                guildData.members[member.id] = {}
                await this.client.dbmanager.updateGuild(message.guild, {members:guildData.members});
            }

            let data = {
                mute :true
            };
            console.log(guildData.members[member.id]);
            const test = Object.assign(guildData.members[member.id],data)

            guildData.members[member.id] = test

            await this.client.dbmanager.updateGuild(message.guild, {members:guildData.members});*/


            let test = [];
            if(!guildData.members[member.id]){
                test[member.id] = {
                    mute: true
                }
            }
            guildData.members.push(test)
            console.log(guildData.members)

            await this.client.dbmanager.updateGuild(message.guild, {members:guildData.members});
            console.log(guildData.members)
            guildData.settings.roles.mute = role.id;
            await this.client.dbmanager.updateGuild(message.guild, {settings:guildData.settings});
        })
    }
}
module.exports = Mute;

//TODO fix database addings