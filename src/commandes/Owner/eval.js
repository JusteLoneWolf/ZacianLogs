const Command = require("../../Base/Command");
const {HELPER } = require("../../Utils/Constant/CommandeHelper");

class Eval extends Command{
    constructor(client){
        super(client,HELPER.COMMANDS.OWNER.EVAL);
    }

    async run(message,args){
        const initialTime = process.hrtime();
        try {
            let code = args.join(' ');
            let evaled = eval(code);
            if (typeof evaled !== 'string')
                evaled = require('util').inspect(evaled);
            if(evaled.includes(this.client.config.token)){
                evaled = evaled.replace(this.client.config.token,'TOKEN')
            }
            if(evaled .length > 2000) {
                evaled  = evaled.substr(0, 1980);
                evaled = evaled + "\nTrop long..";
            }

            const evalDiff = process.hrtime(initialTime);
            await message.channel.send('```js\n' + evaled + '```');
            message.channel.send(evalDiff[0] > 0 ? `${evalDiff[0]}s ${evalDiff[1] / 1000000}ms` : `${evalDiff[1] / 100000}ms`)

        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = Eval;

