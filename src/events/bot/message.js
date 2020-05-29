const AntiInsulte = require("../../modules/antiInsulte")
const {Collection} = require("discord.js")

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    run(message) {
        if (message.channel.type === "dm") return this.client.emit("DirectMessage", message);
        this.client.guildDB.ensure(message.guild.id, {
            prefix: this.client.config.prefix,
            badwords:{
                active: false,
                custom_words:false,
                list:[],
                ignore_role:[],
                ignore_channel:[],
                ignore_members:[],
            },
            channels:{
              logs:""
            },
            settings:{
                punishment:{
                    enabled : false,
                    mute: 3,
                    kick: 5,
                    ban : 8,
                },
                roles:{
                  mute:""
                }
            },
            warns: [],
            members: []
        });


        const insulte = new AntiInsulte(this.client);
        insulte.run(message);
        if (message.author.bot || !message.content.startsWith(this.client.guildDB.get(message.guild.id, "prefix"))) return;

        const args = message.content.split(' ').slice(1);

        const command = message.content.split(' ')[0].slice(this.client.guildDB.get(message.guild.id, "prefix").length);
        const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
        if (!cmd) return;
        if (cmd.cooldown.has(message.author.id)) return message.delete();

        cmd.setMessage(message);
        cmd.run(message, args);

        if (cmd.conf.cooldown > 0) cmd.startCooldown(message.author.id);
    }
};
