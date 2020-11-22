const   AntiInsulte = require("../../modules/antiInsulte"),
     {Collection} = require("discord.js");
module.exports = async (client,message) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return client.emit("DirectMessage", client, message);
    let guildData = await getDataOrCreate(message.guild);

    await AntiInsulte.run(client, message);
    //Antiraid
    if (guildData.settings.antiraid) {
        if (guildData.settings.antiraid.enabled) {
            await require('../../modules/antiraid').getMessage(client, message, guildData.settings.antiraid)
        }
    }
    //

    await require('../../Utils/invitationLogger')(client, message);
    await require('../../Utils/messageCitation')(client, message)
    if (message.author.bot) return;

    const args = message.content.split(' ').slice(1);

    const command = message.content.split(' ')[0].slice((guildData ? guildData.prefix : "zac!").length);
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    //console.log(message.content)
   /* if (message.content.startsWith('<@!717658826379231256>') || message.content.startsWith('<@&719837291794923581>')) {
        console.log(command)
        if (command === 'resetprefix') {
            console.log(3)
            await client.dbmanager.updateGuild(message.guild, {prefix: 'zac!'});
            message.channel.send('Le prefix a etait reset')
        } else if (cmd) {
            console.log(2)
            if (cmd.conf.mention) {
                const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
                if (!cmd) return;
                cmd.run(message, message.content.split(' ').slice(2), guildData);
            }
        }else {
            console.log(1)
            await message.channel.send({
                embed: {
                    title: client.username,
                    description: `Je suis ZacianBot un bot de logs discord et moderation, je suis [open source](https://github.com/zechaos031/ZacianLogs), faite \`${guildData.prefix}help\``
                }
            })
        }
    }*/
    if (!message.content.startsWith(guildData ? guildData.prefix : "zac!")) return;
    if (!cmd) return;
    //Cooldown
    if (!client.cooldowns.has(cmd.help.name)) {
        client.cooldowns.set(cmd.help.name, new Collection());
    }

    const timeNow = Date.now();

    if (!client.config.owner.includes(message.author.id)){

        if (client.cooldowns.get(cmd.help.name).has(message.author.id)) {
            if (timeNow < client.cooldowns.get(cmd.help.name).get(message.author.id) + (cmd.help.cooldown || 5) * 1000) {
                let remain = (client.cooldowns.get(cmd.help.name).get(message.author.id) + (cmd.help.cooldown || 5) * 1000 - timeNow) / 1000
                return message.reply(`merci d'attendre ${remain.toFixed(0)} seconde(s) avant de ré-utiliser la commande \`${cmd.help.name}\`.`);
            }
        } else {
            client.cooldowns.get(cmd.help.name).set(message.author.id, timeNow);
        }
    }
        setTimeout(()=> client.cooldowns.get(cmd.help.name).delete(message.author.id),(cmd.help.cooldown || 5) * 1000)
    //Cooldown

    if (cmd.help.category.toLowerCase() === 'owner' && !client.config.owner.includes(message.author.id)) return message.channel.send('Vous devez etre dévellopeur du bot');

    cmd.setMessage(message);
    try {
        cmd.run(message, args, guildData);
    } catch (e) {
        client.emit('error', e.stack, message.channel, cmd)
    }


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
