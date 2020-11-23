const mongoose = require("mongoose");
const {
    Guild
} = require("../models/index");

class DatabaseManager {
    constructor(client) {
        this.client = client
    }
    createGuild = async guild => {
        const merged = Object.assign({
            _id: mongoose.Types.ObjectId()
        }, guild);
        const createGuild = await new Guild(merged);
        createGuild.save()
    };

    getGuild = async guild => {
        const data = await Guild.findOne({
            GuildId: guild.id
        });
        if (data) return data;
        return false

    };

    updateGuild = async (guild, settings) => {
        let data = await this.getGuild(guild);
        if (typeof data !== "object") data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key];
        }
        return data.updateOne(Object.assign(data, settings));
    };
    removeGuild = async guild => {
        Guild.deleteOne({
            GuildId: guild.id
        }, function(err) {
            if (err) console.log(err);
            console.log("Successful deletion");
        });

    };
}

module.exports = DatabaseManager;
