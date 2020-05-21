const Command = require('../../Base/Command');

class Ping extends Command{
    constructor(client){

        super(client,{
            name:'ping',
            description:'Envoi le ping du bot',
            usage:`ping`,
            coolDown: 5000,
            aliases:['pong','p'],
            permission: 'READ_MESSAGES'
        });
    }

    run(message){
        console.log()
        super.respond(`Ping: ${message.createdAt -Date.now()}ms`)
    }
}

module.exports = Ping;