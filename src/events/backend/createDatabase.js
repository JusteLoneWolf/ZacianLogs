module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(guild) {
        this.client.guildDB.ensure(guild.id, {
            prefix: this.client.config.prefix,
            id: guild.id,
            badwords: {
                active: false,
                list: [],
                ignore_role: [],
                ignore_channel: [],
                ignore_members: [],
            },
            channels: {
                logs: "",

            },
            settings: {
                punishment: {
                    enabled: false,
                    mute: 3,
                    kick: 5,
                    ban: 8,
                },
                roles: {
                    mute: ""
                },
                welcome: {
                    enabled: false,
                    autorole: "",
                    capchat: {
                        unverifiedRole: "",
                        channel: "",
                        enabled: false
                    },

                }
            },
            warns: [],
            members: []
        });
    }
};