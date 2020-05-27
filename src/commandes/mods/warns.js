const Command = require("../../Base/Command");
const {HELPER } = require("../../Utils/Constant/CommandeHelper");

class Eval extends Command{
    constructor(client){
        super(client,HELPER.COMMANDS.MOD.WARN);
    }

    async run(message,args){
        const db = this.client.guildDB.get(message.author.id)
        const reason = args.slice(1).join(" ") || "Pas de raison"
        const user = message.mentions.members.first()
        if(!user) return message.channel.send("Vous devez mentionné un utilisateur")


        if(!db.warns[user.id]){
            db.warns[user.id] = []
        }
        db.warns[user.id][db.warns[user.id].length] = {
            raison : reason
        }
    }
}

module.exports = Eval;