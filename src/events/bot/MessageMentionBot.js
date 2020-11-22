module.exports =  async (client,message,guildData) => {
    console.log(message)
    const command = message.content.split(' ')[1] ? message.content.split(' ')[1].toString() : false;
    if (command) {
        if (command === 'resetprefix') {
            await client.dbmanager.updateGuild(message.guild, {prefix: 'zac!'});
            message.channel.send('Le prefix a etait reset')
        } else if (client.commands.get(command)) {
            if (client.commands.get(command).conf.mention) {
                const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
                if (!cmd) return;
                cmd.run(message, message.content.split(' ').slice(2), guildData);
            }
        }
    } else {
        await message.channel.send({
            embed: {
                title: client.username,
                description: `Je suis ZacianBot un bot de logs discord et moderation, je suis [open source](https://github.com/zechaos031/ZacianLogs), faite \`${guildData.prefix}help\``
            }
        })
    }
};
