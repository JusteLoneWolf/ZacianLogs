module.exports = class {
    constructor(client) {
        this.client = client;

    }
    async run(oldMessage,newMessage) {
        if (newMessage.channel.type === "dm") return;
        let guildData = await this.getDataOrCreate(newMessage.guild);
        if(!guildData.settings.antiraid) return;
        if(!guildData.settings.antiraid.enabled) return

        //TODO a finir
    }

    async getDataOrCreate(guild){
        const {Types} = require('mongoose')
        return new Promise(async (resolve)=>{
            const {Guild} = require('../../models/index');
            let data = await this.client.dbmanager.getGuild(guild);
            if(data){
                resolve(data)
            }else{
                const newGuild= {
                    GuildId : guild.id
                };
                const merged = Object.assign({ _id: Types.ObjectId()}, newGuild);
                data = await new Guild(merged);
                data.save();
                resolve(data)
            }
        })

    }
};