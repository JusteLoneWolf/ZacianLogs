const mongoose = require("mongoose");
const {DBconnection} = require('../../option');

module.exports = {
    init: () => {
        const mongOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            /*useCreateIndex: true,
            useFindAndModify: false,*/
            //autoIndex: false,
            /*poolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4*/
        };
        mongoose.connect(DBconnection, mongOptions);
        mongoose.Promise = global.Promise;
        mongoose.connection.on("connected", () => console.log("Mongoose est connecté!"));

    }
};