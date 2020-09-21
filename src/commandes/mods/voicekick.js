const Command = require("../../Base/Command");
const {HELPER } = require("../../Utils/Constant/CommandeHelper");

class Ban extends Command{
    constructor(client){
        super(client,HELPER.COMMANDS.MOD.VOICEKICK);
        this.client = client

    }

    async run(message,args){
        let member = message.mentions.members.first();
        const reason = args.slice(1).join(" ") || "Aucune raison";
        if(!this.client.utils.resolveUser(message, member,HELPER.COMMANDS.MOD.BAN.permission)) return;

        member = message.guild.member(member);

        if(!member.voice.channel) return message.channel.send("Cette utilisateur n'est pas dans un channel");

        member.voice.kick(reason).then(()=>{
            super.respond(`${member.user.username} a était kick du vocal par ${message.author.username} `)
        })
    }
}

module.exports = Ban;