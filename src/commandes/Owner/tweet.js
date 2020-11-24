const Command = require("../../Base/Command");
const {
    HELPER
} = require("../../Utils/Constant/CommandeHelper");

class Tweet extends Command {
    constructor(client) {
        super(client, HELPER.COMMANDS.OWNER.TWEET);
    }

    run = async (message, args) =>  {
        if (!this.client.config.owner.includes(message.author.id)) return message.channel.send("Vous devez etre dévellopeur du bot");
        switch (args[0]) {
            case "post":
                if (!args[1]) return message.channel.send("Merci d\"indiquer un message")
                this.client.twit.postTweet(args.slice(1).join(" ")).then((data) => {
                    message.channel.send(`Le tweet \`${data.text}\` a etait poster sur tweeter pour id **${data.id_str}**`)
                });
                break;
            case "delete":
                if (!args[1]) return message.channel.send("Merci d\"indiquer un message");
                this.client.twit.deleteTweet(args.slice(1)).then((data) => {
                    message.channel.send(`Le message ${data.text} a etait supprimé`)
                });

                break;
        }




    }
}

module.exports = Tweet;
