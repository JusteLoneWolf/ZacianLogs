const AntiInsulte = require("../../modules/antiInsulte");

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(oldMessage,newMessage) {

        if (!newMessage.author || newMessage.author.bot) return;

        if (newMessage.channel.type === "dm") return this.client.emit("DirectMessage", newMessage);
        let guildData = await this.getDataOrCreate(newMessage.guild);
        const insulte = new AntiInsulte(this.client);
        await insulte.run(newMessage);

        if (newMessage.author.bot) return;
        let prefix = guildData.prefix|| "zac!";
        if(!newMessage.content.startsWith(prefix)) return;

        const command = newMessage.content.split(' ')[0].slice(prefix.length);
        const args = newMessage.content.split(' ').slice(1);

        const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
        if (!cmd) return;
       // if (cmd.cooldown.has(newMessage.author.id)) return newMessage.delete();

        cmd.setMessage(newMessage);
        //if(cmd.help.category.toLowerCase() === 'owner' && !this.client.config.owner.includes(newMessage.author.id)) return newMessage.channel.send('Vous devez etre dévellopeur du bot');

        try{
            cmd.run(newMessage, args,guildData);
        }catch (e) {
            this.client.emit('error',e.stack,newMessage.channel)
        }

        if (cmd.conf.cooldown > 0) cmd.startCooldown(newMessage.author.id);
    }
    async getDataOrCreate(guild){
        return new Promise(async (resolve)=>{
            const {Guild} = require('../../models/index');
            let data = await this.client.dbmanager.getGuild(guild);
            if (!data) {
                data = new Guild({GuildId: guild.id});
                data.save();
                resolve(data)
            } else {
                resolve(data);
            }
        })
    }
};
