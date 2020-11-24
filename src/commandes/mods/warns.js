const Command = require("../../Base/Command");
const {
    HELPER
} = require("../../Utils/Constant/CommandeHelper");
const moment = require("moment");
class Warn extends Command {
    constructor(client) {
        super(client, HELPER.COMMANDS.MOD.WARN);
        this.client = client

    }

    run = async (message, args) =>  {

        const mention = message.mentions.members.first();

        if (!mention) return message.channel.send("Vous devez mentionné un utilisateur");
        const reason = args.slice(1).join(" ") || "Pas de raison";
        const db = await this.client.dbmanager.getGuild(message.guild);
        if (!db.warns[mention.id]) {
            db.warns[mention.id] = [];
        }
        let newWarn = {
            raison: reason,
            time: moment.utc(Date.now()).format("DD/MM/YYYY HH:mm:ss")
        };
        db.warns[mention.id].push(newWarn);

        await this.client.dbmanager.updateGuild(message.guild, {
            warns: db.warns
        });
        message.channel.send(`l'utilisateur ${mention.user.username} a etait avertie pour ${reason} par ${message.author.username} il a actuellement ${db.warns[mention.id].length}`);
        this.client.emit("warnAdd", message, mention, db)


    }
}

module.exports = Warn;
