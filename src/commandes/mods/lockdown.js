const Command = require("../../Base/Command");
const {HELPER } = require("../../Utils/Constant/CommandeHelper");
const {lockChannel} = require('../../modules/antiraid')
class Lockdown extends Command{
    constructor(client){
        super(client,HELPER.COMMANDS.MOD.LOCKDOWN);
        this.client = client

    }

    async run(message,args){
        if (!this.client.utils.resolveUser(message,null, HELPER.COMMANDS.MOD.MUTE.permission)) return;
        lockChannel(message.guild).then((isFinish)=>{
            if(isFinish){
                message.channel.send("Le serveur a etait bloqué")
            }
        })
    }
}

module.exports = Lockdown;
