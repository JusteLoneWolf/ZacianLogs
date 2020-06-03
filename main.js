const Client = require("./src/Base/Client"),
    options = require('./option'),
    client = new Client(options.clientOption);

    client.init();