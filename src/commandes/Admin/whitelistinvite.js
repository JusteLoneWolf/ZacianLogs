const Command = require("../../Base/Command");
const {
    HELPER
} = require("../../Utils/Constant/CommandeHelper");
class Configuration extends Command {
    constructor(client) {
        super(client, HELPER.COMMANDS.ADMIN.WHITELISTINVITE);
        this.client = client

    }

    async run(message, args, guildData) {
        if (!message.member.permissions.has("MANAGE_GUILD", true)) return message.channel.send("Tu n\'as pas la permission `GERER LE SERVER` ou `ADMINISTRATOR`");
        switch (args[0]) {
            case "add":
                if (!args[1]) return message.channel.send("Merci de specifier une invitation ou un serveur");
                if (args[1].match(/(discord\.gg|discord\.com\/invite)\/.+/)) {
                    this.client.fetchInvite(args[1]).then(async invite => {
                        if (!guildData.whitelist[guildData.whitelist.length]) {
                            guildData.whitelist[guildData.whitelist.length] = {};
                        }
                        let newServer = {
                            name: invite.guild.name,
                            id: invite.guild.id,
                            time: moment.utc(Date.now()).format('DD/MM/YYYY HH:mm:ss')
                        };
                        guildData.whitelist[guildData.whitelist.length].push(newServer);

                        await this.client.dbmanager.updateGuild(message.guild, {
                            whitelist: guildData.whitelist
                        });
                        console.log(await this.client.dbmanager.getGuild(message.guild))
                    })
                }
        }
    }
}
module.exports = Configuration;