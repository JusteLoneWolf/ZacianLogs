module.exports = {
    run: async (client, message) => {
        if (message.author.bot) return;
        const db = await client.dbmanager.getGuild(message.guild);
        if (!db) return;
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
                        return message.channel.send("Ce message est dans les mot interdit").then(() => {
                            client.emit("InsulteLogs", message, data)
                        })
                    });
                    return;
                }

            }

        }
    },
    getRoles: (message) => {
        let roles = [];
        message.member.roles.cache.filter(filter => filter.name !== "@everyone").forEach(data => {
            roles.push(data.id)
        });
        return roles
    }
}