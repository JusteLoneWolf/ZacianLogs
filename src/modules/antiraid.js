module.exports = {
    init() {

    },

    lockChannel(guild) {
        return new Promise((resolve, reject) => {
            let id = guild.roles.everyone.id;
            for (const channel of guild.channels.cache.filter(c => c.type !== 'category').array()) {
                channel.updateOverwrite(id, {
                    SEND_MESSAGES: false

                })
            }
            resolve(true)
        })
    },
    unlockChannel(guild) {
        return new Promise((resolve, reject) => {
            let id = guild.roles.everyone.id;
            for (const channel of guild.channels.cache.filter(c => c.type !== 'category').array()) {
                channel.updateOverwrite(id, {
                    'SEND_MESSAGES': null

                })
            }
            resolve(true)
        })
    },

    async getMessage(client, message, data) {

        if (!data.advert[message.author.id]) {
            data.advert[message.author.id] = {
                username: message.author.username,
                content: message.content,
                warn: 0
            };
            await client.dbmanager.updateGuild(message.guild, {
                advert: data.advert
            });
            return
        }

        if (data.advert[message.author.id].content === message.content) {
            data.advert[message.author.id].warn++;
            await client.dbmanager.updateGuild(message.guild, {
                advert: data.advert
            })

        }

        if (data.advert[message.author.id].warn < 3) {
            switch (data.settings.antiraid.blockServer.sanction) {
                case "ban":
                    this.banAction(message.member, message.content);
                    break;
                case "kick":
                    this.kickAction(message.member, message.content);
                    break;
                case "mute":
                    this.muteAction(message.member, message.content);

                    break
            }
        }

    },

    banAction(user, content) {
        let reason = 'Spam/raid avec le message "' + content + '"';
        user.ban(reason)
    },

    kickAction(user, content) {
        let reason = 'Spam/raid avec le message "' + content + '"';
        user.kick(reason)
    },

    muteAction() {

    },

    async removeWarns(client, message, data) {
        if (!data.advert[message.author.id]) return;

        data.advert[message.author.id].advert = 0;
        await client.dbmanager.updateGuild(message.guild, {
            advert: data.advert
        })


    },


    beginAntiraid() {

    },


    endAntiraid() {

    },

    sendRapport() {

    }
};