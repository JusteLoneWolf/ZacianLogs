
module.exports = (client,message) => {
        if (message.author.bot || !message.content.startsWith(client.config.prefix)) return;

        const args = message.content.split(' ').slice(1);

        const command = message.content.split(' ')[0].slice(client.config.prefix.length);
        const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
        if (!cmd) return;
        if (!cmd.conf.allowDMs) return message.channel.send('Cette commande n\'est pas activer en message priver');
        //  if (cmd.cooldown.has(message.author.id)) return message.delete();

        cmd.setMessage(message);
        cmd.run(message, args);

        if (cmd.conf.cooldown > 0) cmd.startCooldown(message.author.id);

}