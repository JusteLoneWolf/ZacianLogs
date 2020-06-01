const Client = require("./src/Base/Client"),
    config = require('./option')
    client = new Client(option ={disableEveryone: false});
client.init(config.config.token);