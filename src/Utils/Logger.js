class Logger{
    constructor(client){
        this.client = client
    }
    info(content){
        return console.log(content)
    }

    error(content){
        return console.error(content)
    }
}

module.exports = Logger;