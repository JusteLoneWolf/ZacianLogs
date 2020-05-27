const Command = require("../../Base/Command");
const {HELPER } = require("../../Utils/Constant/CommandeHelper");
class Ping extends Command{
    constructor(client){
        super(client,HELPER.COMMANDS.GENERICS.PING);
    }

    run(message){
        super.respond(`Ping: ${message.createdAt -Date.now()}ms`)
    }
}

module.exports = Ping;