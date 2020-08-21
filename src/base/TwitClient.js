if(process.env.CTOKEN.length !== 0 || process.env.CSECRETTOKEN.length !== 0 || process.env.ATOKEN.length !== 0 || process.env.ASECRET.length !== 0) {
    const Twit = require('twit')
    const Client = new Twit({
        consumer_key: process.env.CTOKEN,
        consumer_secret: process.env.CSECRETTOKEN,
        access_token: process.env.ATOKEN,
        access_token_secret: process.env.ASECRET,
    })

    class TwitClient {

        postTweet(message) {
            if (!message) return;
            return new Promise(async (resolve) => {
                Client.post('statuses/update', {status: message}, function (err, data, response) {
                    resolve(data)
                })
            })

        }

        searchLatest(id) {
            if (!id) return;
            return new Promise(async (resolve) => {
                Client.get('statuses/user_timeline/:id', {id: id}, function (err, data, response) {
                    resolve(data)
                })
            })
        }

        deleteTweet(id) {
            if (!id) return;
            return new Promise(async (resolve) => {
                Client.post('statuses/destroy/:id', {id: id}, function (err, data, response) {
                    resolve(data)
                })
            })
        }
    }

    module.exports = TwitClient;
}

