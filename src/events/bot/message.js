const AntiInsulte = require("../../modules/antiInsulte");

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(message) {
        if (message.author.bot) return;
        if (message.channel.type === "dm") return this.client.emit("DirectMessage", message);

       if(!this.client.guildDB.get(message.guild.id)){
            this.client.emit('createDatabase',message.guild);
        }

        /*await this.client.utils.fetchInvite(message.guild,this.client.guildDB).then(()=>{
            console.log(`Toutes les invitation get ${message.guild.id}`);
        }).catch((err)=>{
            console.error(err)
        });*/




        const insulte = new AntiInsulte(this.client);
        insulte.run(message);
        this.client.emit('invitationLogger' ,this.client,message)
        if (message.author.bot || !message.content.startsWith(this.client.guildDB.get(message.guild.id, "prefix"))) return;

        const args = message.content.split(' ').slice(1);

        const command = message.content.split(' ')[0].slice(this.client.guildDB.get(message.guild.id, "prefix").length);
        const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
        if (!cmd) return;
       // if (cmd.cooldown.has(message.author.id)) return message.delete();
        if(cmd.help.category === 'Owner' && !this.client.config.owner.includes(message.author.id)) return message.channel.send('Vous devez etre dévellopeur du bot');

        cmd.setMessage(message);
        try{
            cmd.run(message, args);
        }catch (e) {
            this.client.emit('error',e.stack,message.channel,cmd)
        }


        if (cmd.conf.cooldown > 0) cmd.startCooldown(message.author.id);
    }
};
//TODO
// Fix intation issue