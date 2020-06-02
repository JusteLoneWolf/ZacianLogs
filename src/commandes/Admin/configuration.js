
const Command = require("../../Base/Command");
const {HELPER } = require("../../Utils/Constant/CommandeHelper");
class Configuration extends Command {
    constructor(client) {
        super(client, HELPER.COMMANDS.ADMIN.CONFIGURATION);
    }

    run(message,args) {
        let db = this.client.guildDB.get(message.guild.id);
        switch (args[0]) {
            case "set":
                switch (args[1]) {
                    case "logs":
                        let channel = message.mentions.channels.first() ?message.mentions.channels.first() : args.slice(2) ? args.slice(2).join(' '): false;
                        channel = channel ? message.mentions.channels.first() ? channel.name : args.slice(2).join(' '): message.channel.name;
                        channel = message.guild.channels.cache.find(c => c.name === channel || c.id === channel);
                        if(db.channels.logs === channel.id) return super.respond(`Le channel de logs est deja mis sur ${channel.name}`);

                        db.channels.logs = channel.id;
                        this.client.guildDB.set(message.guild.id,db);
                        super.respond(`Les logs sont mis sur ${channel.name}`);
                        break;
                    case "ignorerole":
                        let roles = message.mentions.roles.first() ? message.mentions.roles.first() : args.slice(2) ? args.slice(2).join(' '): false;
                        if(!roles) return false;
                        roles = message.mentions.roles.first() ? roles.name : args.slice(2).join(' ');
                        if(!roles) return false;
                        roles = message.guild.roles.cache.find(r => r.name === roles || r.id === roles);
                        if(db.badwords.ignore_role.includes(roles.id)) return super.respond(`Le role ${roles.name} est deja dans la liste`);
                        db.badwords.ignore_role.push(roles.id);

                        this.client.guildDB.set(message.guild.id,db);
                        super.respond(`Le role ${roles.name} est maintenant ignoré`);
                        break;
                    case "blacklistwords":
                        switch (args[2]) {
                            case "on":
                                db.badwords.active = true;
                                this.client.guildDB.set(message.guild.id,db);
                                super.respond(`La blacklist word est activé`);
                                break
                        }
                        let words = args.slice(2).join(' ');
                        if(db.badwords.list.includes(words)) return super.respond(`Le mot ${words} est déja listé`);
                        db.badwords.list.push(words);
                        this.client.guildDB.set(message.guild.id,db);
                        super.respond(`Le mot ${words} est blacklist`)


                }
                break;
            case "remove":
                switch (args[1]) {
                    case "ignorerole":
                        let roles = message.mentions.roles.first() ? message.mentions.roles.first() : args.slice(2) ? args.slice(2).join(' '): false;
                        if(!roles) return false;
                        roles = message.mentions.roles.first() ? roles.name : args.slice(2).join(' ');
                        if(!roles) return false;
                        roles = message.guild.roles.cache.find(r => r.name === roles || r.id === roles);
                        console.log(roles.id);
                        if(!db.badwords.ignore_role.includes(roles.id)) return super.respond(`Le role ${roles.name} n'est pas dans la liste`);
                        let ignoredRole = db.badwords.ignore_role;
                        let newIgnoredRole = [];
                         ignoredRole.forEach(role =>{
                             if(role !== roles.id){
                                 newIgnoredRole.push(role)
                             }
                             db.badwords.ignore_role = newIgnoredRole;
                             this.client.guildDB.set(message.guild.id,db)
                         });
                        super.respond(`Le role ${roles.name} a etait supprimé`)
                }
                break

        }

    }
}

module.exports = Configuration;