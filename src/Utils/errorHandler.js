module.exports = async (client) => {

    process.on("unhandledRejection", err => {
        if (err) {
            if (err.stack) {
                switch (err.stack) {
                    case err.stack.includes("An invalid token was provided."):
                        console.error("Mauvais token");
                        break;
                    case err.stack.includes("Missing Permissions"):
                        console.error("Permission Error");
                        break;
                    case err.stack.includes(" getaddrinfo ENOTFOUND discordapp.com"):
                        console.log("Impossible to get information from discord");
                        client.destroy();
                        process.exit(0);
                        break;
                    case err.stack:
                        console.error(err.stack);
                        break;

                }
            } else {
                console.error(err)
            }
        }
    });

    process.on("uncaughtException", err => {
        if (err.stack.includes("Promise { <pending> }")) return;
        console.log(err.stack)
    });

    process.on("warning", (err) => {
        console.log(err.stack)
    })
};
