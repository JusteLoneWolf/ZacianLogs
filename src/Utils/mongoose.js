const mongoose = require("mongoose");
const {DBconnection} = require('../../option');

module.exports = {
    init: () => {
        if(!DBconnection) throw new Error('Connection a mongoDB impossible (manque l\'url de connection dans le fichier opton.js) veuillez verifier le fichier .env ou le README.md')
        const mongOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            autoIndex: false,
            poolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4
        };
        mongoose.connect(DBconnection, mongOptions);
        mongoose.Promise = global.Promise;
        mongoose.connection.on("connected", () => console.log("Mongoose est connecté!"));

    }
};