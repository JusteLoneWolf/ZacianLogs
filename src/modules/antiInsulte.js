class AntiInsulte {
    constructor(client) {
        this.client = client
    }

    run(message) {

        if (message.author.bot) return;
        const db = this.client.guildDB.get(message.guild.id);
        if(!db) return
        if (!db.badwords.active) return;

        if (db.badwords.ignore_members.includes(message.author.id) || db.badwords.ignore_channel.includes(message.channel.id)) return;

        let roles = this.getRoles(message);
        for (const role of roles) {
            if (db.badwords.ignore_role.includes(role)) return;
        }


        if (db.badwords.list) {
            let msg = message.content.split(" ");

            for (let word = 0; word < db.badwords.list.length; word++) {
                if (db.badwords.list.includes(msg[word])) {
                    message.delete().then(() => {
                        let data = msg[word];
                        return message.channel.send("This message is in badwords").then(() => {
                            this.client.emit("InsulteLogs", message, data)
                        })
                    });
                    return;
                }

            }

        }
    }

    getRoles(message) {
        let roles = [];
        message.member.roles.cache.filter(filter => filter.name !== "@everyone").forEach(data => {
            roles.push(data.id)
        });
        return roles
    }
}

module.exports = AntiInsulte;