const Client = require("./src/base/Client"),
    options = require('./option'),
    client = new Client(options.clientOption);

    client.init();