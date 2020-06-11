
const Command = require("../../Base/Command");
const {HELPER } = require("../../Utils/Constant/CommandeHelper");
class Configuration extends Command {
    constructor(client) {
        super(client, HELPER.COMMANDS.ADMIN.CONFIGURATION);
    }

   async run(message, args,guildData) {

       let badword = {
           active: false,
           list: guildData.badwords.list,
           ignore_role: guildData.badwords.ignore_role,
           ignore_channel: guildData.badwords.ignore_channel,
           ignore_members: guildData.badwords.ignore_members,
       }
       let settings = {
           punishment: {
               enabled: false,
               mute: 3,
               kick: 5,
               ban: 8,
           },
           roles: {
               mute: null
           },
           welcome: {
               enabled: false,
               autorole: null,
               capchat: {
                   unverifiedRole: null,
                   channel: null,
                   enabled: false
               },
           }
       }
       if (!message.member.permissions.has("MANAGE_GUILD",true)) return message.channel.send("Tu n\'as pas la permission `GERER LE SERVER` ou `ADMINISTRATOR`");
        let db = this.client.guildDB.get(message.guild.id);
        let text ='';
        if (!args[0]) {
            return message.channel.send({
                embed: {
                    title: "Mauvais Argument",
                    fields: [
                        {
                            name: "❱ Utilisation",
                            value: this.help.usage
                        },
                        {
                            name: "❱ Exemple",
                            value: this.help.exemple
                        }
                    ]
                }
            })
        }
        switch (args[0]) {
            case "set":
                if (!args[1] || args[1] !== "logs" && args[1] !== "ignorerole"&& args[1] !== "blacklistwords"&& args[1] !== "prefix" && args[1] !== "capchat"&& args[1] !== "welcome") {
                    return message.channel.send({
                        embed: {
                            title: "Mauvais Argument",
                            fields: [
                                {
                                    name: "❱ Utilisation",
                                    value: this.help.usage
                                },
                                {
                                    name: "❱ Exemple",
                                    value: this.help.exemple
                                }
                            ]
                        }
                    })
                }
                switch (args[1]) {

                    case "logs":
                        let channel = message.mentions.channels.first() ? message.mentions.channels.first() : args.slice(2) ? args.slice(2).join(' ').toLowerCase() : false;
                        channel = channel ? message.mentions.channels.first() ? channel.name : args.slice(2).join(' ').toLowerCase() : message.channel.name;
                        channel = message.guild.channels.cache.find(c => c.name === channel || c.id === channel);
                        if (db.channels.logs === channel.id) return super.respond(`Le channel de logs est deja mis sur ${channel.name}`);

                        db.channels.logs = channel.id;
                        this.client.guildDB.set(message.guild.id, db);
                        super.respond(`Les logs sont mis sur ${channel.name}`);
                        break;
                    case "capchat":
                        switch (args[2]) {
                            case "enabled":
                                if (!db.welcome) {
                                    db.welcome = {
                                        enabled: false,
                                        autorole: "",
                                        capchat: {
                                            unverifiedRole: "",
                                            channel: "",
                                            enabled: true
                                        }
                                    }
                                }else{
                                    db.welcome.capchat.enabled = true
                                }
                                this.client.guildDB.set(message.guild.id,db);
                                text += 'Le capchat est activé\n';

                                message.channel.send(messageSend(text,db));
                                break;
                            case "unverifiedrole":
                                let roles = message.mentions.roles.first() ? message.mentions.roles.first() : args.slice(3) ? args.slice(3).join(' ').toLowerCase() : false;
                                roles = message.mentions.roles.first() ? roles.name : args.slice(3).join(' ').toLowerCase();
                                roles = message.guild.roles.cache.find(r => r.name.toLowerCase() === roles || r.id === roles);
                                if (!roles) return message.channel.send("Le role est introuvable");

                                if (!db.welcome) {
                                    db.welcome = {
                                        enabled: false,
                                        autorole: "",
                                        capchat: {
                                            unverifiedRole: roles.id,
                                            channel: "",
                                            enabled: false
                                        }
                                    }
                                }else{
                                    db.welcome.capchat.unverifiedRole = roles.id
                                }
                                this.client.guildDB.set(message.guild.id,db);
                                text += `Le role pour les personne non verifier est mis a jour ${roles.name}\n`;
                                message.channel.send(messageSend(text,db));
                                await setCapchat();
                                break;
                            case "channel":
                                console.log(args.slice(2));
                                let channel = message.mentions.channels.first() ? message.mentions.channels.first() : args.slice(3) ? args.slice(3).join(' ').toLowerCase() : false;
                                channel = channel ? message.mentions.channels.first() ? channel.name : args.slice(3).join(' ').toLowerCase() : message.channel.name;
                                channel = message.guild.channels.cache.find(c => c.name.toLowerCase() === channel || c.id === channel);
                                if (!channel) return message.channel.send("Le channel est introuvable");

                                if (!db.welcome) {
                                    db.welcome = {
                                        enabled: false,
                                        autorole: "",
                                        capchat: {
                                            unverifiedRole: "",
                                            channel: channel.id,
                                            enabled: false
                                        }
                                    }
                                }else{
                                    db.welcome.capchat.channel = channel.id
                                }
                                this.client.guildDB.set(message.guild.id,db);
                                text += `Le channel pour les personne non verifier est mis a jour sur ${channel.name}\n`;

                                message.channel.send(messageSend(text,db));
                                await setCapchat();
                                break
                        }
                        break;
                    case "welcome":
                        switch (args[2]) {
                            case "enabled":
                                if (!db.welcome) {
                                    db.welcome = {
                                        enabled: true,
                                        autorole: "",
                                        capchat: {
                                            unverifiedRole: "",
                                            channel: "",
                                            enabled: false
                                        }
                                    }
                                }else{
                                    db.welcome.enabled = true
                                }
                                this.client.guildDB.set(message.guild.id,db);
                                text += 'Le system de bienvenue est activé\n';


                                message.channel.send(messageSend(text,db));
                                break;
                            case "autorole":
                                let roles = message.mentions.roles.first() ? message.mentions.roles.first() : args.slice(3) ? args.slice(3).join(' ').toLowerCase() : false;
                                roles = message.mentions.roles.first() ? roles.name : args.slice(3).join(' ').toLowerCase();
                                roles = message.guild.roles.cache.find(r => r.name.toLowerCase() === roles || r.id === roles);
                                if (!roles) return message.channel.send("Le role est introuvable");
                                if (!db.welcome) {
                                    db.welcome = {
                                        enabled: false,
                                        autorole: roles.id,
                                        capchat: {
                                            unverifiedRole: "",
                                            channel: "",
                                            enabled: false
                                        }
                                    }
                                }else{
                                    db.welcome.autorole = roles.id
                                }
                                this.client.guildDB.set(message.guild.id,db);
                                text +=`L'autorole est sur ${roles.name}\n`;

                                message.channel.send(messageSend(text,db));
                                break;
                        }
                        break;
                    case "ignorerole":
                        let roles = message.mentions.roles.first() ? message.mentions.roles.first() : args.slice(2) ? args.slice(2).join(' ').toLowerCase() : false;
                        if (!roles) return message.channel.send("Le roles est introuvable");
                        roles = message.mentions.roles.first() ? roles.name : args.slice(2).join(' ').toLowerCase();
                        roles = message.guild.roles.cache.find(r => r.name === roles || r.id === roles);
                        if (!roles) return message.channel.send("Le roles est introuvable");
                        if (db.badwords.ignore_role.includes(roles.id)) return super.respond(`Le role ${roles.name} est deja dans la liste`);
                        db.badwords.ignore_role.push(roles.id);

                        this.client.guildDB.set(message.guild.id, db);
                        super.respond(`Le role ${roles.name} est maintenant ignoré`);
                        break;
                    case "blacklistwords":
                        switch (args[2]) {
                            case "on":
                                badword.active = true;
                                guildData.badword=badword;
                                guildData.save()
                                return super.respond(`La blacklist word est activé`);
                        }
                        if (!args[2]) {
                            return message.channel.send({
                                embed: {
                                    title: "Mauvais Argument",
                                    fields: [
                                        {
                                            name: "❱ Utilisation",
                                            value: this.help.usage
                                        },
                                        {
                                            name: "❱ Exemple",
                                            value: this.help.exemple
                                        }
                                    ]
                                }
                            })
                        }
                        let words = args.slice(2).join(' ');
                        if (db.badwords.list.includes(words)) return super.respond(`Le mot ${words} est déja listé`);
                        db.badwords.list.push(words);
                        this.client.guildDB.set(message.guild.id, db);
                        super.respond(`Le mot ${words} est blacklist`);
                        break;
                    case "prefix":
                        if (!args.slice(2).toString()) return super.respond('Merci de definir un prefix');
                        if (args.slice(2).join(' ').length <= 3) return super.respond(`Le prefix doit avoir plus de  **3** characters`);
                        if (args.slice(2).join(' ').includes('*') || args.slice(2).join(' ').includes('_') || args.slice(2).join(' ').includes('~') || args.slice(2).join(' ').includes('`')) return super.respond(`Les caracterres \`*\`, \`_\`, \`~\`, \`~\`, \`\`\` ne sont pas accepté`);
                        await this.client.dbmanager.updateGuild(message.guild, {prefix: args.slice(2).join('')})
                        super.respond(`Le prefix est maintenant **${args.slice(2).join('')}**`);
                        break
                }
                break;
            case "remove":
                if (!args[1]|| args[1] !== "ignorerole"&& args[1] !== "blacklistwords") {
                    return message.channel.send({
                        embed: {
                            title: "Mauvais Argument",
                            fields: [
                                {
                                    name: "❱ Utilisation",
                                    value: this.help.usage
                                },
                                {
                                    name: "❱ Exemple",
                                    value: this.help.exemple
                                }
                            ]
                        }
                    })
                }
                switch (args[1]) {
                    case "ignorerole":
                        let roles = message.mentions.roles.first() ? message.mentions.roles.first() : args.slice(2) ? args.slice(2).join(' ').toLowerCase() : false;
                        if (!roles) return message.channel.send("Le roles est introuvable");
                        roles = message.mentions.roles.first() ? roles.name : args.slice(2).join(' ').toLowerCase();
                        roles = message.guild.roles.cache.find(r => r.name === roles || r.id === roles);
                        if (!roles) return message.channel.send("Le roles est introuvable");
                        if (!db.badwords.ignore_role.includes(roles.id)) return super.respond(`Le role ${roles.name} n'est pas dans la liste`);
                        let ignoredRole = db.badwords.ignore_role;
                        let newIgnoredRole = [];
                        ignoredRole.forEach(role => {
                            if (role !== roles.id) {
                                newIgnoredRole.push(role)
                            }
                            db.badwords.ignore_role = newIgnoredRole;
                            this.client.guildDB.set(message.guild.id, db)
                        });
                        super.respond(`Le role ${roles.name} a etait supprimé`);
                        break;
                    case "blacklistwords":
                        let words = args.slice(2).join(' ');
                        if (!db.badwords.list.includes(words)) return super.respond(`Le mot ${words} n'est déja listé`);
                        let badWord = db.badwords.list;
                        let newBadWord = [];
                        badWord.forEach(role => {
                            if (role !== words) {
                                newBadWord.push(role)
                            }
                            db.badwords.list = newBadWord;
                            this.client.guildDB.set(message.guild.id, db)
                        });

                        this.client.guildDB.set(message.guild.id, db);
                        super.respond(`Le mot ${words} n'est plus blacklist`);
                        break;
                }
                break;
            case"view":
                if (!db.welcome) {
                    db.welcome = {
                        enabled: true,
                        autorole: "",
                        capchat: {
                            unverifiedRole: "",
                            channel: "",
                            enabled: false
                        }
                    };
                    this.client.guildDB.set(message.guild.id,db);
                }
                let eventlist = ["Ajout/Mise a jour/Suppression de Channel","Ajout de channel AFK","Ajout de la bannierre du serveur","Ajout/Suprression de boost","Augmentation/Diminution du niveau du serveur","Ajout/Mise a jours/Suppression de membres","Changement de pseudo","Ajout/Suppression de role","Mise a jours de la region","Ajout/Suppression des invitations","Edition de message","Ajout/Suppression de message épinglé","Logs des invitation posté"];
                return message.channel.send({
                    embed: {
                        title: "Configuration du bot",
                        fields: [
                            {
                                name: '❱ Channel de logs',
                                value: message.guild.channels.cache.get(this.client.guildDB.get(message.guild.id, "channels.logs")) ? message.guild.channels.cache.get(this.client.guildDB.get(message.guild.id, "channels.logs")) : "Pas de channel"
                            },
                            {
                                name: "❱ Systeme mauvais mot",
                                value: this.client.guildDB.get(message.guild.id).badwords.active ? "Activé" : "Désactivé"
                            },
                            {
                                name: "❱ Role ignoré",
                                value: this.client.guildDB.get(message.guild.id).badwords.ignore_role.map(id => message.guild.roles.cache.get(id) ? message.guild.roles.cache.get(id) : "Role introuvable").join(" ") || "Pas de roles"
                            },
                            {
                                name: "❱ Liste des mauvais mot",
                                value: this.client.guildDB.get(message.guild.id).badwords.list.map(badword => badword).join(", ") || "Pas de roles"
                            },
                            {
                                name: "❱ Capchat",
                                value: `Channel: ${message.guild.channels.cache.get(this.client.guildDB.get(message.guild.id).welcome.capchat.channel)? message.guild.channels.cache.get(this.client.guildDB.get(message.guild.id).welcome.capchat.channel).name : "Pas de channel"}\nRole: ${message.guild.roles.cache.get(this.client.guildDB.get(message.guild.id).welcome.capchat.unverifiedRole) ? message.guild.roles.cache.get(this.client.guildDB.get(message.guild.id).welcome.capchat.unverifiedRole).name : "Pas de role"}`
                            },
                            {
                                name: "❱ Autorole",
                                value: `${message.guild.roles.cache.get(this.client.guildDB.get(message.guild.id).welcome.autorole) ? message.guild.roles.cache.get(this.client.guildDB.get(message.guild.id).welcome.autorole).name : "Pas de role"}`
                            },
                            {
                                name:"❱ Liste des logs",
                                value: eventlist.sort().join('\n')
                            }
                        ]
                    }
                })
        }
        function messageSend(text,db) {
            text += !db.welcome.capchat.enabled ?`\n:warning: Le system de capchat n'est pas activé \`${db.prefix}configuration set capchat enabled\`` :'';
            text += !db.welcome.enabled ?`\n:warning: Le system de bienvenue n'est pas activé \`${db.prefix}configuration set welcome enabled\`` :'';
            text += !db.welcome.capchat.unverifiedRole ?`\n:warning: Il manque un role pour les personne non verifier \`${db.prefix}configuration set capchat unverifiedrole <nom du role>\`` :'';
            text += !db.welcome.capchat.channel ?`\n:warning: Il manque un channel de pour les personne non verifier \`${db.prefix}configuration set capchat channel <nom du channel>\`` :'';
            text += !db.welcome.autorole ?`\n:warning: Il manque un role pour les personne verifier \`${db.prefix}configuration set capchat autorole <nom du role>\`` :'';
            return text
        }
        async function setCapchat() {
            let channels = message.guild.channels.cache.find(c => c.id === db.welcome.capchat.channel );
            if(!channels) return;
            let roles = message.guild.roles.cache.find(c => c.id === db.welcome.capchat.unverifiedRole);
            await roles.setPermissions(0);
            for (const channel of message.guild.channels.cache.array()) {
                if (channel.id !== channels.id) {
                    if(channel.permissionsFor(roles).has("SEND_MESSAGES") &&channel.permissionsFor(roles).has("VIEW_CHANNEL") ) {
                        await channel.overwritePermissions([
                            {
                                id: roles.id,
                                deny: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                            }
                        ])
                    }
                }

            }
        }
    }
}
module.exports = Configuration;