const Command = require("../../Base/Command");
const {HELPER } = require("../../Utils/Constant/CommandeHelper");
class say extends Command{
    constructor(client){
        super(client,HELPER.COMMANDS.GENERICS.SAY);
    }

    run(message,args){
        super.respond(args.join(' '))
    }
}

module.exports = say;