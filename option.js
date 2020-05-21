require('dotenv').config();

module.exports = {
    config:{
        prefix : '!',
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
    perm:{}


};