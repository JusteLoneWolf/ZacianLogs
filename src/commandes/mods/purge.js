const Command = require("../../Base/Command");
const {
    HELPER
} = require("../../Utils/Constant/CommandeHelper");
class Purge extends Command {
    constructor(client) {
        super(client, HELPER.COMMANDS.MOD.PURGE);
        this.client = client

    }

    run = async (message, args) =>  {
        if (args[0] === "search") return purgeSearch(message, this.client);
        else return purge(message, this.client);

        function purgeSearch(message, client) {

            let query = message.content.split(" ").slice(2).join(" ");

            message.channel.send("Collecte des messages...").then(top => {

                message.channel.messages.fetch({
                    limit: 100
                }).then(msgs => {

                    msgs = msgs.filter(m => m.content.toLowerCase().includes(query) && m.id !== message.id);

                    if (msgs.size < 1) return top.edit(`Pas de message trouver contenant \`${query}\``);
                    message.channel.bulkDelete(msgs, true).then(() => {
                        top.edit(`Suppression de  \`${msgs.size}\` message contenant \`${query}\``).catch(() => {
                            message.channel.send(`Suppression de  \`${msgs.size}\` message contenant \`${query}\``);
                        })

                    }).catch(err => top.edit(`\`Suppression echoué...\`\n\nenvoyer cette erreur a  <@${client.users.cache.get("236627494764150784").id}> ou sur le serveur du support\n\`${err}\``))

                })
            })

        }

        function purge(message, client) {

            message.channel.send("Collecte des messages...").then(top => {
                let args = message.content.split(" ").slice(1);
                let num = args[1] || false;

                if (!num) num = 10;
                if (isNaN(num)) return message.send(`Ce n"est pas un nombre valide`);
                if (num < 2) num = 2;
                if (num > 100) num = 100;

                message.channel.messages.fetch({
                        limit: num
                    })
                    .then(msgs => {

                        msgs = filter(message, msgs);

                        message.channel.send(`\`${msgs.size - 1}\` collecté. filtrage en cours...`)
                            .then(top => {

                                if (msgs.size < 2) return top.edit("`Pas de message a nettoyer.`");

                                message.channel.bulkDelete(msgs, true).then(() => {
                                    top.delete();
                                    if (message.mentions.users.first()) message.channel.send(`  Suppression reussi ${msgs.size - 1}/${num} messages par **${message.mentions.users.first().username}** dans ${message.channel.toString()}!`);
                                    else if (!message.mentions.users.first()) message.channel.send(`Suppression reussi ${msgs.size - 1}/${num} messages dans ${message.channel.toString()}`, message.author.displayAvatarURL())

                                }).catch(err => top.edit(`\`Suppression echoué...\`\n\nenvoyer cette erreur a  <@${client.users.cache.get("236627494764150784").id}> ou sur le serveur du support\n\`${err}\``))

                            })

                    }).catch(err => top.edit(`\`Suppression echoué...\`\n\nenvoyer cette erreur a  <@${client.users.cache.get("236627494764150784").id}> ou sur le serveur du support\n\`${err}\``))

            })

        }

        function filter(message, msgs) {

            msgs = msgs.filter(m => {

                let fail = true;

                if (message.content.includes(" -b") && !m.author.client) return false;
                if (message.mentions.users.first()) {

                    fail = false;

                    message.mentions.users.forEach(user => {

                        if (m.author.id === user.id) fail = true

                    })

                }

                return fail;


            });

            return msgs
        }
    }
}
module.exports = Purge;
