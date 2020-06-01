
const Command = require("../../Base/Command");
const {HELPER } = require("../../Utils/Constant/CommandeHelper");
class Configuration extends Command {
    constructor(client) {
        super(client, HELPER.COMMANDS.ADMIN.CONFIGURATION);
    }

    run(message,args) {
        switch (args[0]) {
            case "set":
                switch (args[1]) {
                    case "logs":
                        let channel = message.mentions.channels.first() ?message.mentions.channels.first() : args.slice(2) ? args.slice(2).join(' '): false;
                        channel = channel ? message.mentions.channels.first() ? channel.name : args.slice(2).join(' '): message.channel.name;
                        channel = message.guild.channels.cache.find(c => c.name === channel || c.id === channel)
                        let db = this.client.guildDB.get(message.guild.id)

                        db.channels.logs = channel.id
                        this.client.guildDB.set(message.guild.id,db)
                        super.respond(`Les logs sont mis sur ${channel.name}`)
                        break

                }
                break

        }

    }
}

module.exports = Configuration;