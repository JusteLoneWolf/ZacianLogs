
const AntiInsulte = require("../../modules/antiInsulte");
const {Collection} = require('discord.js')
module.exports = async (client,oldMessage,newMessage) => {

    if (!newMessage.author || newMessage.author.bot) return;

    if (newMessage.channel.type === "dm") return client.emit("DirectMessage", newMessage);
    let guildData = await getDataOrCreate(newMessage.guild);
    await AntiInsulte.run(client,newMessage);


    //Antiraid
    if (guildData.settings.antiraid) {
        if (guildData.settings.antiraid.enabled) {
            await require('../../modules/antiraid').getMessage(client, newMessage, guildData.settings.antiraid)
        }
    }
    //
    client.emit('LogmessageUpdate', oldMessage, newMessage)

    if (newMessage.author.bot) return;
    let prefix = guildData.prefix || "zac!";
    if (!newMessage.content.startsWith(prefix)) return;

    const command = newMessage.content.split(' ')[0].slice(prefix.length);
    const args = newMessage.content.split(' ').slice(1);

    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    if (!cmd) return;

    //Cooldown
    if (!client.cooldowns.has(cmd.help.name)) {
        client.cooldowns.set(cmd.help.name, new Collection());
    }

    const timeNow = Date.now();
    const tStamps = client.cooldowns.get(cmd.help.name);
    const cdAmount = (cmd.help.cooldown || 5) * 1000;

    if (!client.config.owner.includes(newMessage.author.id)){

        if (tStamps.has(newMessage.author.id)) {
            const exT = tStamps.get(newMessage.author.id) + cdAmount

            if (timeNow < exT) {
                let remain = (exT - timeNow) / 1000
                return newMessage.reply(`merci d'attendre ${remain.toFixed(0)} seconde(s) avant de ré-utiliser la commande \`${cmd.help.name}\`.`);
            }
        } else {
            tStamps.set(newMessage.author.id, timeNow);
        }
    }
    setTimeout(()=> tStamps.delete(newMessage.author.id),cdAmount)
    //Cooldown
    if (cmd.help.category.toLowerCase() === 'owner' && !client.config.owner.includes(newMessage.author.id)) return newMessage.channel.send('Vous devez etre dévellopeur du bot');

    cmd.setMessage(newMessage);

    try {
        cmd.run(newMessage, args, guildData);
    } catch (e) {
        client.emit('error', e.stack, newMessage.channel)
    }

    if (cmd.conf.cooldown > 0) cmd.startCooldown(newMessage.author.id);

    async function getDataOrCreate(guild) {

        return new Promise(async (resolve) => {
            const {Guild} = require('../../models/index');
            let data = await client.dbmanager.getGuild(guild);
            if (!data) {
                const merged = Object.assign({_id: mongoose.Types.ObjectId()}, guild);
                let savedata = await new Guild(merged);
                savedata.save();
                resolve(savedata)
            } else {
                resolve(data);
            }
        })
    };
}

