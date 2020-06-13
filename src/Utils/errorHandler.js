module.exports = async (client) => {

    process.on('unhandledRejection', err =>{
        if(err) {
            if(err.stack) {
                if (err.stack.includes('An invalid token was provided.')) {
                    console.log('Bad token see config.js for set the token');
                } else if (err.stack.includes('Missing Permissions')) {
                    console.log(err)
                    console.log('Permission Error')
                } else if(err.stack.includes(' getaddrinfo ENOTFOUND discordapp.com')) {
                    console.log('Impossible to get information from discord');
                    client.destroy()
                    process.exit(0)
                }else{
                    console.log(err.stack)
                }
            }else{
                console.log(err)
            }
        }
    });

    process.on('uncaughtException', err =>{
        if (err.stack.includes('Promise { <pending> }')) return;
        console.log(err.stack)
    });

    process.on('warning', (err) => {
        console.log(err.stack)
    })
};