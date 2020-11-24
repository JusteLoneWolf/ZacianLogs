const Command = require("../../Base/Command");
const {
    HELPER
} = require("../../Utils/Constant/CommandeHelper");

class Checkuser extends Command {
    constructor(client) {
        super(client, HELPER.COMMANDS.MOD.CHECKUSER);
        this.client = client

    }

    run = async (message) =>  {

        const members = message.guild.members;
        const withInvite = members.cache.filter((m) => m.user.presence.activities.name && /(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i.test(m.user.presence.activities.name));

        const text = (withInvite.length > 0 ?
            withInvite.map((member) => `ID:\`${member.id}\` Pseudo: ${member.displayName} a une invitation dans son status`).join("\n") :
            "Personne n'a d'invitation dans son status");
        //message.channel.send(text)

        //TODO Checkuser
        /*  const member = message.guild.members;
          member.cache.map(user=>{
              console.log(user.user.presence)

              if(user.user.presence.activities.length !== 0){
                  for(const activity of user.user.presence.activities){
                      if(/(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i.test(activity.name)){
                          console.log("content")
                      }
                  }
              }
          })*/
    }
}

module.exports = Checkuser;
