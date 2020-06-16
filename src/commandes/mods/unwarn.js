const Command = require("../../Base/Command");
const {HELPER } = require("../../Utils/Constant/CommandeHelper");
class UnWarn extends Command{
    constructor(client){
        super(client,HELPER.COMMANDS.MOD.UNWARN);
    }

    async run(message,args) {

        const mention = message.mentions.members.first();
        if (!mention) return message.channel.send("Vous devez mentionné un utilisateur");
        if(!args[1] || isNaN(args[1])) return message.channel.send("Merci de choisir le warn");

        const db = await this.client.dbmanager.getGuild(message.guild);


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
        message.channel.send(`Le warn ${args[1]} a etait supprime\nRaison du warn: ${db.warns[mention.user.id][args[1]-1].raison}`);
        this.client.emit('warnDelete', message,mention,db,args);
        db.warns[mention.user.id] = newWarn;

        await this.client.dbmanager.updateGuild(message.guild, {warns:db.warns});


    }
}

module.exports = UnWarn;