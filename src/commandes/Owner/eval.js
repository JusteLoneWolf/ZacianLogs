const Command = require("../../Base/Command");
const {
    HELPER
} = require("../../Utils/Constant/CommandeHelper");

class Eval extends Command {
    constructor(client) {
        super(client, HELPER.COMMANDS.OWNER.EVAL);
    }

    run = async (message, args) => {
        if (!this.client.config.owner.includes(message.author.id)) return message.channel.send("Vous devez etre dévellopeur du bot");
        const initialTime = process.hrtime();
        try {
            let code = args.join(" ");
            let evaled = eval(code);
            if (evaled) {
                if (evaled.length > 900) {
                    evaled = evaled.substr(0, 900);
                    evaled += "\nTrop long..";
                }
                if (typeof evaled !== "string")
                    evaled = require("util").inspect(evaled);
                if (evaled.includes(this.client.config.token)) {
                    evaled = evaled.replace(this.client.config.token, "TOKEN")
                }
            }


            const evalDiff = process.hrtime(initialTime);
            await message.channel.send({
                embed: {
                    fields: [{
                        name: "❱ Code",
                        value: `\`\`\`js\n ${code} \`\`\``
                    },
                        {
                            name: "❱ Resultat",
                            value: `\`\`\`js\n ${evaled} \`\`\``
                        }
                    ],
                    footer: {
                        text: evalDiff[0] > 0 ? `${evalDiff[0]}s ${evalDiff[1] / 1000000}ms` : `${evalDiff[1] / 100000}ms`
                    }
                }
            })
        } catch (err) {
            this.client.emit("error", err.stack, message.channel)
        }
    }
}

module.exports = Eval;
