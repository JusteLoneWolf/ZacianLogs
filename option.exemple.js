require("dotenv").config();

module.exports = {
        config: {
            prefix: "zac!",
            token: process.env.TOKEN,
            owner: []
        },
        clientOption: {
            ws: {
                intents: [
                    "GUILDS",
                    "GUILD_BANS",
                    "GUILD_INVITES",
                    "GUILD_MESSAGES",
                    "DIRECT_MESSAGES"
                ]
            },
            disableEveryone: true,
            fetchAllMembers: false,
            messageCacheMaxSize: 100,
            messageSweepInterval: 120,
            partials: ["GUILD_MEMBER", "MESSAGE", "USER", "CHANNEL"]
            },
            perm: {},
            DBconnection: process.env.DBCONNECT
        };
