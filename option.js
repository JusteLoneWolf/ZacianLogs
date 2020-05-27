require("dotenv").config();

module.exports = {
    config:{
        prefix : "!",
        token: process.env.TOKEN,
        owner: []
    },
    clientOption:{
        disableEveryone: true,
        fetchAllMembers: false,
        messageCacheMaxSize: 20,
        messageCacheLifetime: 120,
        messageSweepInterval: 120
    },
    perm:{},
    dashboard:{
        oauthSecret: process.env.SECRET,
        callbackURL:"http//localhost:3030/callback",
        sSecret:process.env.SSECRET,
        domain:"localhost",
        port:3030
    }
};