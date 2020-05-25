module.exports = class {
    constructor(client) {
        this.client = client;
    }
    run(){
        console.log('pret')
        require('../../modules/dashboard')(this.client)
    }
};