const Command = require("../../Base/Command");
const {
    HELPER
} = require("../../Utils/Constant/CommandeHelper");

class Poll extends Command {
    constructor(client) {
        super(client, HELPER.COMMANDS.MOD.POLL);
        this.client = client

    }

    run = async (message, args) => {

        const slipAws = args.join(" ").split("/")

        if (!slipAws) return message.channel.send("Vous devez inclure un question")
        if (!slipAws[1].split("|")) return message.channel.send("Vous devez inclure une a 10 reponse")
        const emote = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"]
        let question = []
        for (let i = 0; i < slipAws[1].split("|").length; i++) {
            if (i < emote.length) {
                if (slipAws[1].split("|")[i]) {

                    question.push(`${emote[i]} ${slipAws[1].split("|")[i]}`)
                }
            }
        }

        message.channel.send({
            embed: {
                title: "Sondage",
                description: slipAws[0] + "\n" + question.join("\n"),
                fields: []
            }
        }).then((msg) => {
            for (let i = 0; i < slipAws[1].split("|").length; i++) {
                if (i < emote.length) {
                    if (slipAws[1].split("|")[i]) {
                        msg.react(emote[i])
                    }
                }
            }
        })

    }
}

module.exports = Poll;
