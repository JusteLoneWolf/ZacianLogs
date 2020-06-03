

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    run(newMember, role) {
        if (!this.client.guildDB.get(newMember.guild.id)) return

        let channel = newMember.guild.channels.cache.get(this.client.guildDB.get(newMember.guild.id, "channels.logs"));
        if (!channel) return;

        channel.send({
            embed: {
                title: "Role Logs",
                description: "Un membre a un nouveau role",
                color: 0xF5AD2E,
                fields: [
                    {
                        name: "❱ Nouveau role",
                        value: role.name
                    },
                    {
                        name: "❱ Utilisateur",
                        value: newMember.user.username
                    },
                    {
                        name: "❱ Roles actuelle",
                        value: newMember.roles.cache.size > 0 ? newMember.roles.cache.filter(r => r.name !== "@everyone").map(roles => roles.name).join(", ") : "Aucun role"
                    }
                ]
            }
        })
    }
};