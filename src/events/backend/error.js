module.exports = (client,error, message,cmd)=>{
    console.log(client)
        client.logger.error(error);
        if(message){
            if(error.length > 950) {
                error = error.substr(0, 950);
                error  += "\nTrop long..";
            }

            message.send({
                embed:{
                    title:"Une erreur est survenue",
                    description:"Si l'erreur persiste merci de contacter le devellopeur",
                    fields:[
                        {
                            name:"Erreur",
                            value:`\`\`\`js\n${error.substr(0, 950)}\`\`\``
                        }
                    ]
                }
            })
        }
        if(process.env.WHLOG.length !== 0){
            const {WebhookClient} = require('discord.js');
            const log = new WebhookClient('717677164836814888', process.env.WHLOG);
            return log.send(` ${cmd ? `La commande ${cmd.help.name} a une erreur \n` : ''}\`\`\`js\n${error}\`\`\``)
        }
        console.log(` ${cmd ? `La commande ${cmd.help.name} a une erreur \n` : ''}\n${error}`)
};