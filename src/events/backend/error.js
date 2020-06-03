module.exports = class {
    constructor(client) {
        this.client = client;
    }
    run(error, message){
        this.client.logger.error(error);
        if(error.length > 1000) {
            error = error.substr(0, 500);
            error  += "\nTrop long..";
        }
        if(message){
            if(error.length > 1000) {
                error = error.substr(0, 500);
                error  += "\nTrop long..";
            }
            message.send({
                embed:{
                    title:"Une erreur est survenue",
                    description:"Si l'erreur persiste merci de contacter le devellopeur",
                    fields:[
                        {
                            name:"Erreur",
                            value:`\`\`\`js\n${error}\`\`\``
                        }
                    ]
                }
            })
        }
        const {WebhookClient} = require('discord.js')
        const log = new WebhookClient('717677164836814888', process.env.WHLOG);
        log.send(`\`\`\`js\n${error}\`\`\``,)


    }
};