const mongoose = require("mongoose");
const {config} = require("../../option");

const guildSchema = mongoose.Schema({
    TableId: mongoose.Schema.Types.ObjectId,
    GuildId: String,
    prefix:{
        type :String,
        default : config.prefix
    },
    badwords: {
        type:Object,
        default: {
            active: false,
            list: [],
            ignore_role: [],
            ignore_channel: [],
            ignore_members: [],
        }
    },
    settings:{
        type:Object,
        default:{
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
            }
        }
    },
    warns: {
        type:Object,
        default :{}
    },
    members:{
        type: Array,
        default :[]
    },
    channels:{
        type:Object,
        default:{
            log: null
        }
    }
});

module.exports = mongoose.model("Guild",guildSchema);