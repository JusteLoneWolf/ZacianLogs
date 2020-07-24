const   AntiInsulte = require("../../modules/antiInsulte"),
     {Collection} = require("discord.js");
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

        if (!this.client.cooldowns.has(cmd.help.name)) {
            this.client.cooldowns.set(cmd.help.name, new Collection());
        }

        const timeNow = Date.now();
        const tStamps = this.client.cooldowns.get(cmd.help.name);
        const cdAmount = (cmd.help.cooldown || 5) * 1000;

        if (tStamps.has(message.author.id)) {
            const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;

            if (timeNow < cdExpirationTime) {
                let timeLeft = (cdExpirationTime - timeNow) / 1000;
                return message.reply(`merci d'attendre ${timeLeft.toFixed(0)} seconde(s) avant de ré-utiliser la commande \`${cmd.help.name}\`.`);
            }
        }

        tStamps.set(message.author.id, timeNow);
        setTimeout(() => tStamps.delete(message.author.id), cdAmount);
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