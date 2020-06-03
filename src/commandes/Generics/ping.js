const Command = require("../../Base/Command");
const {HELPER } = require("../../Utils/Constant/CommandeHelper");
class Ping extends Command{
    constructor(client){
        super(client,HELPER.COMMANDS.GENERICS.PING);
    }

    run(message){
        super.respond(`Ping: ${Date.now()-message.createdAt}ms\nPing du bot ${this.client.ws.ping}ms `)
    }
}

module.exports = Ping;