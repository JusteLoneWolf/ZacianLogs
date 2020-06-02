module.exports = class {
    constructor(client) {
        this.client = client;
    }
    run(error){
        this.client.logger.error(error)
    }
};