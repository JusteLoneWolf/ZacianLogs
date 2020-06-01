const Client = require("./src/Base/Client"),
    options = require('./option')
    client = new Client(option =options.clientOption);
client.init(options.config.token);