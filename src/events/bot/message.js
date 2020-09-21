const   AntiInsulte = require("../../modules/antiInsulte"),
     {Collection} = require("discord.js");
module.exports = async (client,message) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return client.emit("DirectMessage",client, message);
    let guildData = await getDataOrCreate(message.guild);

    await AntiInsulte.run(client,message);
    //Antiraid
    if (guildData.settings.antiraid) {
        if (guildData.settings.antiraid.enabled) {
            await require('../../modules/antiraid').getMessage(client, message, guildData.settings.antiraid)
        }
    }
    //

    await require('../../Utils/invitationLogger')(client,message);
    await require('../../Utils/messageCitation')(client, message)
    if (message.author.bot) return;
    if (message.content.startsWith('<@!717658826379231256>')) return client.emit('MessageMentionBot',client, message, guildData);

    let prefix = guildData ? guildData.prefix : "zac!";
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.split(' ').slice(1);

    const command = message.content.split(' ')[0].slice(prefix.length);
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    if (!cmd) return;

    if (!client.cooldowns.has(cmd.help.name)) {
        client.cooldowns.set(cmd.help.name, new Collection());
    }

    const timeNow = Date.now();
    const tStamps = client.cooldowns.get(cmd.help.name);
    const cdAmount = (cmd.help.cooldown || 5) * 1000;
    if (!client.config.owner.includes(message.author.id)) {
        if (tStamps.has(message.author.id)) {
            const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;

            if (timeNow < cdExpirationTime) {
                let timeLeft = (cdExpirationTime - timeNow) / 1000;
                return message.reply(`merci d'attendre ${timeLeft.toFixed(0)} seconde(s) avant de ré-utiliser la commande \`${cmd.help.name}\`.`);
            }
        }
        tStamps.set(message.author.id, timeNow);
        setTimeout(() => tStamps.delete(message.author.id), cdAmount);
    }

    if (cmd.help.category.toLowerCase() === 'owner' && !client.config.owner.includes(message.author.id)) return message.channel.send('Vous devez etre dévellopeur du bot');

    cmd.setMessage(message);
    try {
        //await this.getInvite(client,message.guild, guildData)
        cmd.run(message, args, guildData);
    } catch (e) {
        client.emit('error', e.stack, message.channel, cmd)
    }

    if (cmd.conf.cooldown > 0) cmd.startCooldown(message.author.id);

    async function getDataOrCreate(guild) {
        const {Types} = require('mongoose')
        return new Promise(async (resolve) => {
            const {Guild} = require('../../models/index');
            let data = await client.dbmanager.getGuild(guild);
            if (data) {
                resolve(data)
            } else {
                const newGuild = {
                    GuildId: guild.id
                };
                const merged = Object.assign({_id: Types.ObjectId()}, newGuild);
                let savedata = await new Guild(merged);
                savedata.save();
                resolve(savedata)
            }
        })
    }
}


    /*async getInvite(client,guild,db){
        if(db){
            try{
                await guild.fetchInvites().then(async invite=>{
                    if(!db.invites[invite.code]){
                        db.invites[invite.code] ={}
                        await client.dbmanager.updateGuild(guild, {invites:db.invites});

                    }
                    let inviteData = {};
                    inviteData[guild.id] = invite;
                    Object.assign(db.invites,inviteData);
                    await client.dbmanager.updateGuild(guild, {invites:db.invites});
                    console.log(`Invitation get ${guild.id}`)
                }).catch((err)=>{
                    console.error(err)
                })
            }catch (e) {
                return client.logger.error(e)
            }
        }
    }*/
