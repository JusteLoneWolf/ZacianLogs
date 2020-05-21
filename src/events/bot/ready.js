module.exports = class {
    constructor(client) {
        this.client = client;
    }
    run(){
        const {totalmem} = require('os');

        console.log('pret')
        setInterval(()=>{
           //console.log( `${Math.trunc((process.memoryUsage().heapUsed))} MB / ${Math.trunc(totalmem() / 1024 / 1000)} MB (${Math.round((Math.round(process.memoryUsage().heapUsed / 1024 / 1024) / Math.round(totalmem() / 1024 / 1024)) * 100)}%)`)
        },1000)
    }
};