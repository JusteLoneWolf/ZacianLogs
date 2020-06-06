const Command = require("../../Base/Command");
const {HELPER } = require("../../Utils/Constant/CommandeHelper");
const moment = require('moment');
class Warn extends Command{
    constructor(client){
        super(client,HELPER.COMMANDS.MOD.WARN);
    }

    async run(message,args) {

        const mention = message.mentions.members.first();

        if (!mention) return message.channel.send("Vous devez mentionné un utilisateur");
        const reason = args.slice(1).join(" ") || "Pas de raison";
        const db = this.client.guildDB.get(message.guild.id);
           if (!db.warns[mention.id]) {
                db.warns[mention.id] = [];
                 this.client.guildDB.set(message.guild.id,db)
            }
        let newWarn = {
            raison: reason,
            time: moment.utc(Date.now()).format('DD/MM/YYYY HH:mm:ss')
        };
        db.warns[mention.id].push(newWarn);
        this.client.guildDB.set(message.guild.id,db)
        message.channel.send(`l'utilisateur ${mention.user.username} a etait avertie pour ${reason} par ${message.author.id} il a actuellement ${db.warns[mention.id].length}`)
        this.client.emit("warnAdd",message,mention,db)


    }
}

module.exports = Warn;