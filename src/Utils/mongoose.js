const mongoose = require("mongoose");
const {
    DBconnection
} = require('../../option');
const Log = require('../Utils/Logger')
const Logger = new Log()

module.exports = {
    init: async () => {
        if (!DBconnection) throw new Error('Connection a mongoDB impossible (manque l\'url de connection dans le fichier opton.js) veuillez verifier le fichier .env ou le README.md')
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
        await mongoose.connection.on("connected", () => Logger.info("Mongoose est connecté!"));

    }
};