const AntiInsulte = require('../../modules/antiInsulte')

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    run(message) {

        this.client.guildDB.ensure(message.guild.id, {
            prefix: this.client.config.prefix,
        });

        const insulte = new AntiInsulte(this.client);
        insulte.run(message);
        if (message.author.bot || !message.content.startsWith(this.client.guildDB.get(message.guild.id, "prefix"))) return;

        const args = message.content.split(/\s+/g);
        const command = args.shift().slice(this.client.guildDB.get(message.guild.id, "prefix").length);
        const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));

        if (!cmd) return;
        if (cmd.cooldown.has(message.author.id)) return message.delete();

        cmd.setMessage(message);
        cmd.run(message, args);

        if (cmd.conf.cooldown > 0) cmd.startCooldown(message.author.id);
    }
};
