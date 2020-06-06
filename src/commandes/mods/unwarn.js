const Command = require("../../Base/Command");
const {HELPER } = require("../../Utils/Constant/CommandeHelper");
class UnWarn extends Command{
    constructor(client){
        super(client,HELPER.COMMANDS.MOD.UNWARN);
    }

    async run(message,args) {

        const mention = message.mentions.members.first();
        if (!mention) return message.channel.send("Vous devez mentionné un utilisateur");
        console.log(this.client.guildDB.get(message.guild.id).warns[mention.user.id])
        if(!args[1] || isNaN(args[1])) return message.channel.send("Merci de choisir le warn")

        const db = this.client.guildDB.get(message.guild.id);

        if (!db.warns[mention.id]) message.channel.send("Cette utilisateur n'as pas de warn");


        let warn = db.warns[mention.user.id];
        let selectedWarn = warn[args[1]-1];
        if(!selectedWarn) return message.channel.send("Ce warn est invalide");
        let newWarn = [];
        let select;

        for(select = 0;select <warn.length;select++){
            if(select !== args[1]-1){
                newWarn.push(db.warns[mention.user.id][select])
            }
        }
        message.channel.send(`Le warn ${args[1]} a etait supprime\nRaison du warn: ${db.warns[mention.user.id][args[1]-1].raison}`)
        this.client.emit('warnDelete', message,mention,db);
        db.warns[mention.user.id] = newWarn;
        this.client.guildDB.set(message.guild.id, db);


    }
}

module.exports = UnWarn;