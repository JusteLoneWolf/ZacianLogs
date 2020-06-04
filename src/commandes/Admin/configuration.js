
const Command = require("../../Base/Command");
const {HELPER } = require("../../Utils/Constant/CommandeHelper");
class Configuration extends Command {
    constructor(client) {
        super(client, HELPER.COMMANDS.ADMIN.CONFIGURATION);
    }

    run(message, args) {
        let db = this.client.guildDB.get(message.guild.id);
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
                if (!args[1] || args[1] !== "logs" && args[1] !== "ignorerole"&& args[1] !== "blacklistwords"&& args[1] !== "prefix") {
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
                        let channel = message.mentions.channels.first() ? message.mentions.channels.first() : args.slice(2) ? args.slice(2).join(' ') : false;
                        channel = channel ? message.mentions.channels.first() ? channel.name : args.slice(2).join(' ') : message.channel.name;
                        channel = message.guild.channels.cache.find(c => c.name === channel || c.id === channel);
                        if (db.channels.logs === channel.id) return super.respond(`Le channel de logs est deja mis sur ${channel.name}`);

                        db.channels.logs = channel.id;
                        this.client.guildDB.set(message.guild.id, db);
                        super.respond(`Les logs sont mis sur ${channel.name}`);
                        break;
                    case "ignorerole":
                        let roles = message.mentions.roles.first() ? message.mentions.roles.first() : args.slice(2) ? args.slice(2).join(' ') : false;
                        if (!roles) return false;
                        roles = message.mentions.roles.first() ? roles.name : args.slice(2).join(' ');
                        roles = message.guild.roles.cache.find(r => r.name === roles || r.id === roles);
                        if (!roles) return false;
                        if (db.badwords.ignore_role.includes(roles.id)) return super.respond(`Le role ${roles.name} est deja dans la liste`);
                        db.badwords.ignore_role.push(roles.id);

                        this.client.guildDB.set(message.guild.id, db);
                        super.respond(`Le role ${roles.name} est maintenant ignoré`);
                        break;
                    case "blacklistwords":
                        switch (args[2]) {
                            case "on":
                                db.badwords.active = true;
                                this.client.guildDB.set(message.guild.id, db);
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
                        db.prefix = args.slice(2).join('');
                        this.client.guildDB.set(message.guild.id, db);
                        super.respond(`Le prefix est maintenant **${db.prefix}**`);
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
                        let roles = message.mentions.roles.first() ? message.mentions.roles.first() : args.slice(2) ? args.slice(2).join(' ') : false;
                        if (!roles) return false;
                        roles = message.mentions.roles.first() ? roles.name : args.slice(2).join(' ');
                        roles = message.guild.roles.cache.find(r => r.name === roles || r.id === roles);
                        if (!roles) return false;
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
                let eventlist = ["Ajout/Mise a jour/Suppression de Channel","Ajout de channel AFK","Ajout de la bannierre du serveur","Ajout/Suprression de boost","Augmentation/Diminution du niveau du serveur","Ajout/Mise a jours/Suppression de membres","Changement de pseudo","Ajout/Suppression de role","Mise a jours de la region","Ajout/Suppression des invitations","Edition de message","Ajout/Suppression de message épinglé"];
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
                                name:"❱ Liste des logs",
                                value: eventlist.sort().join('\n')
                            }
                        ]
                    }
                })
        }
    }
}

module.exports = Configuration;