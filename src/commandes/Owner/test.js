const Command = require('../../Base/Command');
const {HELPER } = require('../../Utils/Constant/CommandeHelper');
class Test extends Command{
    constructor(client){
        super(client,HELPER.COMMANDS.OWNER.TEST);
    }

    run(message){
        let test = {caca:[]}

        test.caca[message.guild.id]= []
        test.caca[message.guild.id][test.caca[message.guild.id].length] ={ bite : 'lol'}

        test.caca[message.guild.id][test.caca[message.guild.id].length] ={ bite : 'loli'}

        console.log(test)
    }
}

module.exports = Test;