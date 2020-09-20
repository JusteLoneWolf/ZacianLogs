const AntiInsulte = require("../../modules/antiInsulte");

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    run= async (oldMessage,newMessage) => {

        if (!newMessage.author || newMessage.author.bot) return;

        if (newMessage.channel.type === "dm") return this.client.emit("DirectMessage", newMessage);
        let guildData = await this.getDataOrCreate(newMessage.guild);
        const insulte = new AntiInsulte(this.client);
        await insulte.run(newMessage);

        //Antiraid
        if(guildData.settings.antiraid) {
            if(guildData.settings.antiraid.enabled) {
                await require('../../modules/antiraid').getMessage(this.client, newMessage, guildData.settings.antiraid)
            }
        }
        //
        this.client.emit('LogmessageUpdate',oldMessage,newMessage)

        if (newMessage.author.bot) return;
        let prefix = guildData.prefix|| "zac!";
        if(!newMessage.content.startsWith(prefix)) return;

        const command = newMessage.content.split(' ')[0].slice(prefix.length);
        const args = newMessage.content.split(' ').slice(1);

        const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
        if (!cmd) return;

        if (!this.client.cooldowns.has(cmd.help.name)) {
            this.client.cooldowns.set(cmd.help.name, new Collection());
        }

        const timeNow = Date.now();
        const tStamps = this.client.cooldowns.get(cmd.help.name);
        const cdAmount = (cmd.help.cooldown || 5) * 1000;
        if(!this.client.config.owner.includes(newMessage.author.id)) {
            if (tStamps.has(newMessage.author.id)) {
                const cdExpirationTime = tStamps.get(newMessage.author.id) + cdAmount;

                if (timeNow < cdExpirationTime) {
                    let timeLeft = (cdExpirationTime - timeNow) / 1000;
                    return newMessage.channel.send(`merci d'attendre ${timeLeft.toFixed(0)} seconde(s) avant de ré-utiliser la commande \`${cmd.help.name}\`.`);
                }
            }
        }

        tStamps.set(newMessage.author.id, timeNow);
        setTimeout(() => tStamps.delete(newMessage.author.id), cdAmount);
        if(cmd.help.category.toLowerCase() === 'owner' && !this.client.config.owner.includes(newMessage.author.id)) return newMessage.channel.send('Vous devez etre dévellopeur du bot');

        cmd.setMessage(newMessage);

        try{
            cmd.run(newMessage, args,guildData);
        }catch (e) {
            this.client.emit('error',e.stack,newMessage.channel)
        }

        if (cmd.conf.cooldown > 0) cmd.startCooldown(newMessage.author.id);
    }
    getDataOrCreate= async (guild) => {
        return new Promise(async (resolve)=>{
            const {Guild} = require('../../models/index');
            let data = await this.client.dbmanager.getGuild(guild);
            if (!data) {
                let savedata = await new Guild(merged);
                savedata.save();
                resolve(savedata)
            } else {
                resolve(data);
            }
        })
    }
};
