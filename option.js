require("dotenv").config();

module.exports = {
    config:{
        prefix : "!",
        token: process.env.TOKEN,
        owner: ['236627494764150784']
    },
    clientOption:{
        /*ws:{intents:[
                "GUILDS",
                "GUILD_BANS",
                "GUILD_INVITES",
                "GUILD_MESSAGES",
                "DIRECT_MESSAGES"
            ]},*/
        disableEveryone: true,
        fetchAllMembers: false,
        messageCacheMaxSize: 20,
        messageCacheLifetime: 120,
        messageSweepInterval: 120
    },
    perm:{},
    /*dashboard:{
        oauthSecret: process.env.SECRET,
        callbackURL:"http//localhost:3030/callback",
        sSecret:process.env.SSECRET,
        domain:"localhost",
        port:3030
    }*/
};