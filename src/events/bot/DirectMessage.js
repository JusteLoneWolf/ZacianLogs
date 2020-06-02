
module.exports = class {
    constructor(client) {
        this.client = client;
    }

    run(message) {
        if (message.author.bot || !message.content.startsWith(this.client.config.prefix)) return;

        const args = message.content.split(' ').slice(1);

        const command = message.content.split(' ')[0].slice(this.client.config.prefix.length);
        const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
        if (!cmd) return;
        if(!cmd.conf.allowDMs) return message.channel.send('Cette commande n\'est pas activer en message priver');
        if (cmd.cooldown.has(message.author.id)) return message.delete();

        cmd.setMessage(message);
        cmd.run(message, args);

        if (cmd.conf.cooldown > 0) cmd.startCooldown(message.author.id);
    }
};