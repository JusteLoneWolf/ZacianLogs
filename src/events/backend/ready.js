module.exports = async (client) => {
    await client.user.setPresence({
        activity: {
            name: `${client.config.prefix}help `,
            type: "LISTENING"
        }
    }).then(() => client.logger.info('Status set !'));

    client.logger.info(`${client.user.username} pret`);
    require('../../Utils/statsChannels').init(client)
};