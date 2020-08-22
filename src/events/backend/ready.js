const {Guild} = require('../../models/index');
module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run() {
        await this.client.user.setPresence({
            activity: {
                name: `${this.client.config.prefix}help `,
                type: "LISTENING"
            }
        }).then(() => this.client.logger.info('Status set !'));

        this.client.logger.info(`${this.client.user.username} pret`);
        require('../../Utils/statsChannels').init(this.client)


    }
};