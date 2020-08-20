module.exports = class {
    constructor(client) {
        this.client = client;

    }
    async run(message) {
        if (message.channel.type === "dm") return;
        let guildData = await this.getDataOrCreate(message.guild);
        if(!guildData.settings.antiraid) return;
        if(!guildData.settings.antiraid.enabled) return;
        await require('../../modules/antiraid').getMessage(this.client, message, guildData.settings.antiraid)
    }

    async getDataOrCreate(guild){
        return new Promise(async (resolve)=>{
            const {Guild} = require('../../models/index');
            let data = await this.client.dbmanager.getGuild(guild);
            if(data){
                resolve(data)
            }else{
                const newGuild= {
                    GuildId : guild.id
                };
                const merged = Object.assign({ _id: mongoose.Types.ObjectId()}, newGuild);
                let savedata = await new Guild(merged);
                savedata.save();
                resolve(savedata)
            }
        })
    }
};