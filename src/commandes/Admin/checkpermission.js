const Command = require("../../Base/Command");
const {
    HELPER
} = require("../../Utils/Constant/CommandeHelper");
class Checkpermission extends Command {
    constructor(client) {
        super(client, HELPER.COMMANDS.ADMIN.CHECKPERMISSION);
        this.client = client

    }

    run = (message) => {
        let permMessage = "";
        message.guild.channels.cache.filter(channel => channel.type === "text").map(channel => {
            permMessage += `${channel.name} =>`;
            if (channel.permissionsFor(this.client.user).has("SEND_MESSAGES")) {
                permMessage += `Envoyé des message :white_check_mark: `
            } else {
                permMessage += `Envoyé des message :x:  `
            }
        });
        message.channel.send(permMessage)
    }
}

module.exports = Checkpermission;
