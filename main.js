const Client = require("./src/Base/Client"),
    options = require('./option'),
    client = new Client(options.clientOption);

    client.init();

    process.on('rejectionHandled', (err) => {
        client.logger.error(err)
    });

    process.on('unhandledRejection', (err) => {
        client.logger.error(err)
    });

    process.on('uncaughtException', (err) => {
        client.logger.error(err)
    });