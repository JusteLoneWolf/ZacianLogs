const AntiInsulte = require("../../modules/antiInsulte");

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(message) {
        if (message.author.bot) return;
        if (message.channel.type === "dm") return this.client.emit("DirectMessage", message);
        let guildData = await this.getDataOrCreate(message.guild);

        const insulte = new AntiInsulte(this.client);
        await insulte.run(message);
        this.client.emit('invitationLogger' ,message);
        this.client.emit('messageCitation' ,message);
        if (message.author.bot) return;
        let prefix = guildData ? guildData.prefix : "zac!";
        if(!message.content.startsWith(prefix)) return;

        const args = message.content.split(' ').slice(1);

        const command = message.content.split(' ')[0].slice(prefix.length);
        const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
        if (!cmd) return;
       // if (cmd.cooldown.has(message.author.id)) return message.delete();
        if(cmd.help.category.toLowerCase() === 'owner' && !this.client.config.owner.includes(message.author.id)) return message.channel.send('Vous devez etre dévellopeur du bot');

        cmd.setMessage(message);
        try{
            cmd.run(message, args,guildData);
        }catch (e) {
            this.client.emit('error',e.stack,message.channel,cmd)
        }


        if (cmd.conf.cooldown > 0) cmd.startCooldown(message.author.id);
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
                data = await new Guild(merged);
                data.save();
                resolve(data)
            }
        })

    }
};