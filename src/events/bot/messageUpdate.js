const AntiInsulte = require("../../modules/antiInsulte");

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    run(oldMessage,newMessage) {

        if (newMessage.author.bot) return;

        if (newMessage.channel.type === "dm") return this.client.emit("DirectMessage", newMessage);

        const insulte = new AntiInsulte(this.client);
        insulte.run(newMessage);

        if (newMessage.author.bot) return;
        let prefix = this.client.guildDB.get(newMessage.guild.id, "prefix") || "zac!"
        if(!newMessage.content.startsWith(prefix)) return

        const command = newMessage.content.split(' ')[0].slice(this.client.guildDB.get(newMessage.guild.id, "prefix").length);
        const args = newMessage.content.split(' ').slice(1);

        const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
        if (!cmd) return;
       // if (cmd.cooldown.has(newMessage.author.id)) return newMessage.delete();

        cmd.setMessage(newMessage);
        try{
            cmd.run(newMessage, args);
        }catch (e) {
            this.client.emit('error',e.stack,newMessage.channel)
        }

        if (cmd.conf.cooldown > 0) cmd.startCooldown(newMessage.author.id);
    }
};
