module.exports = class {
    constructor(client) {
        this.client = client;
    }
    run(){

        this.client.fetchApplication().then((data)=> {
            this.client.logger.info(`${data.name} pret`)
        });
        //require('../../modules/dashboard')(this.client)
    }
};