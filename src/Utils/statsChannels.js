let guildData = {};
module.exports = {
    init: (client) => {
        client.guilds.cache.map(async guild => {
            let data = await client.dbmanager.getGuild(guild);
            if (data && data.channels.counter) {
                let addedGuild = {
                    id: guild.id,
                    channelsCounter: {
                        category: data.channels.counter.category,
                        member: {
                            id: data.channels.counter.member.id,
                            centent: data.channels.counter.member.centent
                        },
                        bot: {
                            id: data.channels.counter.bot.id,
                            centent: data.channels.counter.bot.centent
                        },
                        all: {
                            id: data.channels.counter.all.id,
                            centent: data.channels.counter.all.centent
                        },
                        task: {
                            id: data.channels.counter.task.id,
                            centent: data.channels.counter.task.centent
                        }
                    }
                };
                Object.assign(guildData[guild.id], addedGuild)
            }
        })
    },

    add: async (client, db, guild) => {
        if (!message.guild.channels.find(c => c.name === "Stats du serveur" && c.type === "category")) {
            var category_stats = await message.guild.channels.create("Stats du serveur", {
                type: "category"
            });
            db.channels.counter.category = category_stats.id;
            client.db.set(message.guild.id, db);
        } else {
            var category_stats = message.guild.channels.find(c => c.id === db.channels.counter.category) || message.guild.channels.find(c => c.name === "â­ Stats du serveur" && c.type === "category")
        }
        var channel_botcount;
        var channel_usercount;
        var channel_total;
        var channel_task;
        if (db.channels.counter.bot.id === "" || !message.guild.channels.find(c => c.id === db.channels.counter.bot && c.type === "voice") && !message.guild.channels.find(c => c.name.startsWith("Bots : ") && c.type === "voice")) {
            channel_botcount = await message.guild.channels.create(`Bots : ${message.guild.members.filter(b => b.user.bot).size}`, {
                type: "voice"
            }).then(channel => channel.setParent(category_stats.id)).catch((err) => {
                client.emit("error", err, message)
            });
        } else {
            channel_botcount = message.guild.channels.find(c => c.name.startsWith("Bots :") && c.type === "voice");
            await message.guild.channels.get(channel_botcount.id).setParent(category_stats.id);
        }
        if (db.channels.counter.member === "" || !message.guild.channels.find(c => c.id === db.channels.counter.member && c.type === "voice") && !message.guild.channels.find(c => c.name.startsWith("Utilisateurs : ") && c.type === "voice")) {
            channel_usercount = await message.guild.channels.create(`Utilisateurs : ${message.guild.members.filter(b => !b.user.bot).size}`, {
                type: "voice"
            }).then(channel => channel.setParent(category_stats.id)).catch((err) => {
                client.emit("error", err, message)
            });
        } else {
            channel_usercount = message.guild.channels.find(c => c.name.startsWith("Utilisateurs : ") && c.type === "voice");
            await message.guild.channels.get(channel_usercount.id).setParent(category_stats.id);
        }
        if (db.channels.counter.all.id === "" || !message.guild.channels.find(c => c.id === db.channels.counter.all.id && c.type === "voice") && !message.guild.channels.find(c => c.name.startsWith("Total : ") && c.type === "voice")) {
            channel_total = await message.guild.channels.create(`Total : ${message.guild.memberCount}`, {
                type: `voice`
            }).then(channel => channel.setParent(category_stats.id)).catch((err) => {
                client.emit("error", err, message)
            });
        } else {
            channel_total = message.guild.channels.find(c => c.name.startsWith("Total : ") && c.type === "voice");
            await message.guild.channels.get(channel_total.id).setParent(category_stats.id);
        }
        if (db.channels.counter.task.id === "" || !message.guild.channels.find(c => c.id === db.channels.counter.task.id && c.type === "voice") && !message.guild.channels.find(c => c.name.startsWith("Objectif : ") && c.type === "voice")) {
            channel_task = await message.guild.channels.create(`Objectif : ${message.guild.memberCount}`, {
                type: `voice`
            }).then(channel => channel.setParent(category_stats.id)).catch((err) => {
                client.emit("error", err, message)
            });
        } else {
            channel_task = message.guild.channels.find(c => c.name.startsWith("Objectif : ") && c.type === "voice");
            await message.guild.channels.get(channel_task.id).setParent(category_stats.id);
        }
        db.channels.counter.bot.id = channel_botcount.id;
        db.channels.counter.all.id = channel_total.id;
        db.channels.counter.member.id = channel_usercount.id;
        db.channels.counter.task.id = channel_task.id
        message.channel.send("Le compteur a bien Ã©tÃ© installÃ© avec succé")

    },

    update: (client) => {

    },

    delete: (client) => {

    },
};
