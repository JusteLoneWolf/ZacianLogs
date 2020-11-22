const Command = require("../../Base/Command");
const {HELPER } = require("../../Utils/Constant/CommandeHelper");

class Kick extends Command{
    constructor(client){
        super(client,HELPER.COMMANDS.MOD.KICK);
        this.client = client

    }

    async run(message,args){
        let member = message.mentions.members.first();
        const reason = args.slice(1).join(" ") || "Aucune raison";
        if(!this.client.utils.resolveUser(message, member, HELPER.COMMANDS.MOD.KICK.permission)) return;

        member = message.guild.member(member);

        if(!member.kickable) return message.channel.send("Je ne peux pas kick un utilisateur");

        member.kick(reason).then(()=>{
            message.channel.send(`${member.user.username} a était kick par ${message.author.username} `)
        })
    }
}

module.exports = Kick;
