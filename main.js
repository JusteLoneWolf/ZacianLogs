const Client = require("./src/Base/Client"),
    option = require("./option"),
    client = new Client({options:"option"});
client.init(option.config.token);