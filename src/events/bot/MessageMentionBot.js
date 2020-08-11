module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async run(message) {
        const command = message.content.split(' ').slice(1).toString();
        if (command === 'resetprefix') {
            await this.client.dbmanager.updateGuild(message.guild, {prefix: 'zac!'});

            message.channel.send('Le prefix a etait reset')
        }
    }
};