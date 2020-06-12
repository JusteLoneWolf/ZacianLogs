class AntiInsulte {
    constructor(client) {
        this.client = client
    }

    run(message) {

        if (message.author.bot) return;
        const db = this.client.guildDB.get(message.guild.id);
        if(!db) return
        if (!db.badword.active) return;

        if (db.badword.ignore_members.includes(message.author.id) || db.badword.ignore_channel.includes(message.channel.id)) return;

        let roles = this.getRoles(message);
        for (const role of roles) {
            if (db.badword.ignore_role.includes(role)) return;
        }


        if (db.badword.list) {
            let msg = message.content.split(" ");

            for (let word = 0; word < db.badword.list.length; word++) {
                if (db.badword.list.includes(msg[word])) {
                    message.delete().then(() => {
                        let data = msg[word];
                        return message.channel.send("Ce message est dans les mot interdit").then(() => {
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