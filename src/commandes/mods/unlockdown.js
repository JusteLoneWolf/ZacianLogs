const Command = require("../../Base/Command");
const {
    HELPER
} = require("../../Utils/Constant/CommandeHelper");
const {
    unlockChannel
} = require('../../modules/antiraid')
class unLockdown extends Command {
    constructor(client) {
        super(client, HELPER.COMMANDS.MOD.UNLOCKDOWN);
        this.client = client

    }

    async run(message, args) {
        if (!this.client.utils.resolveUser(message, null, HELPER.COMMANDS.MOD.MUTE.permission)) return;
        unlockChannel(message.guild).then((isFinish) => {
            if (isFinish) {
                message.channel.send("Le serveur a etait débloqué")
            }
        })
    }
}

module.exports = unLockdown;