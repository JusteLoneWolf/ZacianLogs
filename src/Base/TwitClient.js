if(process.env.CTOKEN.length !== 0 || process.env.CSECRETTOKEN.length !== 0 || process.env.ATOKEN.length !== 0 || process.env.ASECRET.length !== 0) {
    const Twit = require('twit');
    const Client = new Twit(require("../../option").twit);


    class TwitClient {
        constructor() {

        }
        postTweet(message) {
            if (!message) return;
            return new Promise(async (resolve, reject) => {
                try {
                    Client.post('statuses/update', {status: message}, function (err, data, response) {
                        resolve(data)
                    })
                } catch (e) {
                    reject(e)
                }
            })
        }

        searchLatest(id) {
            if (!id) return;
            return new Promise(async (resolve, reject) => {
                try {
                    Client.get('statuses/user_timeline/:id', {id: id}, function (err, data, response) {
                        resolve(data)
                    })
                } catch (e) {
                    reject(e)
                }
            })
        }

        deleteTweet(id) {
            if (!id) return;
            return new Promise(async (resolve, reject) => {
                try {
                    Client.post('statuses/destroy/:id', {id: id}, function (err, data, response) {
                        resolve(data)
                    })
                } catch (e) {
                    reject(e)
                }
            })
        }
    }

    module.exports = TwitClient;
}

