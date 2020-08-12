class Command {
    constructor(client, options) {
        this.client = client;
        this.help = {
            name: options.name || null,
            description: options.description || "Pas d'information donnée.",
            usage: options.usage ?  `${this.client.config.prefix}${options.usage}`: "",
            category: options.category || "Information",
            exemple: options.exemple || "Pas d'exemple"
        };
        this.conf = {
            permLevel: options.permLevel || 0,
            permission: options.permission || "SEND_MESSAGES",
            cooldown: options.cooldown || 1000,
            aliases: options.aliases || [],
            allowDMs: options.allowDMs || false,
            args : options.args || "pas d\"arguments",
            mention : options.mention || false
        };
        this.cooldown = new Set();
    }

    startCooldown(user) {
        this.cooldown.add(user);
        setTimeout(() => {
            this.cooldown.delete(user);
        }, this.conf.cooldown);
    }

    setMessage(message) {
        this.message = message;
    }

    respond(message) {
        this.message.channel.send(this.client.utils.parseMessage(message));
    }
}

module.exports = Command;
