const Client = require("./src/Base/Client"),
    options = require('./option'),
    client = new Client(options.clientOption);

    client.init();

    process.on('rejectionHandled', (err) => {
        console.log(err);
    });

    process.on('unhandledRejection', (err) => {
        console.log(err);
    });

    process.on('uncaughtException', (err) => {
        console.log(err);
    });