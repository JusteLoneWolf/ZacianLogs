const Command = require('../../Base/Command');
const {HELPER } = require('../../Utils/Constant/CommandeHelper');
class Test extends Command{
    constructor(client){
        super(client,HELPER.COMMANDS.OWNER.TEST);
    }

    run(message){
            if(!this.client.config.owner.includes(message.author.id)) return message.channel.send('Vous devez etre dévellopeur du bot')

    let test = require('../../../index.js')

    test('Crave rave',1).then((res)=>{
        console.log(res.length)
   })


    }
}

module.exports = Test;