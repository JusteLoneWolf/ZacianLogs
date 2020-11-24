const Command = require("../../Base/Command");
const {
    HELPER
} = require("../../Utils/Constant/CommandeHelper");
class Ping extends Command {
    constructor(client) {
        super(client, HELPER.COMMANDS.GENERICS.PING);
        this.client = client

    }

     run = async (message) =>  {
        const ping = await message.channel.send("Calcul du ping en cours...");
        return ping.edit(`Ping: ${ping.createdAt - message.createdAt}ms\nPing du bot ${this.client.ws.ping}ms `)
    }
}

module.exports = Ping;
