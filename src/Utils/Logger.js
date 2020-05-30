const chalk = require("chalk"),
     moment = require("moment"),
{error} = require('../Utils/CustomError');
require("moment-duration-format");

class Logger{
    constructor(client){
        this.client = client
    }
    info(content){
        return console.log(`[${moment.utc(Date.now()).format("HH:mm:ss")}] ${chalk.bgBlack.green(content)}`)
    }

    error(content){
        return console.error(`[${moment.utc(Date.now()).format("HH:mm:ss")}] ${chalk.bgBlack.red(content)}`)
    }
}

module.exports = Logger;