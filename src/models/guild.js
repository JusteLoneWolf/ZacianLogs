const mongoose = require("mongoose");
const {
    config
} = require("../../option");

const guildSchema = mongoose.Schema({
    TableId: mongoose.Schema.Types.ObjectId,
    GuildId: String,
    prefix: {
        type: String,
        default: config.prefix
    },
    badwords: {
        type: Object,
        default: {
            active: false,
            list: [],
            ignore_role: [],
            ignore_channel: [],
            ignore_members: [],
        }
    },
    settings: {
        type: Object,
        default: {
            punishment: {
                enabled: false,
                mute: 3,
                kick: 5,
                ban: 8,
            },
            roles: {
                mute: null
            },
            welcome: {
                enabled: false,
                autorole: null,
                capchat: {
                    unverifiedRole: null,
                    channel: null,
                    enabled: false
                },
            },
            antiraid: {
                enabled: false,
                blockServer: {
                    enabled: false,
                    sanction: ""
                },
                advert: {}
            }
        }
    },
    warns: {
        type: Object,
        default: {}
    },
    members: {
        type: Object,
        default: {}
    },
    channels: {
        type: Object,
        default: {
            log: null
        }
    },
    invites: {
        type: Object,
        default: {}
    }
});

module.exports = mongoose.model("Guild", guildSchema);
