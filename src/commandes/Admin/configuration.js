
const Command = require("../../Base/Command");
const {HELPER } = require("../../Utils/Constant/CommandeHelper");
class Configuration extends Command {
    constructor(client) {
        super(client, HELPER.COMMANDS.ADMIN.CONFIGURATION);
    }

   async run(message, args,guildData) {
       let text = ''
       if (!message.member.permissions.has("MANAGE_GUILD",true)) return message.channel.send("Tu n\'as pas la permission `GERER LE SERVER` ou `ADMINISTRATOR`");
        async function makeMessage(text,client) {
            let db =  await client.dbmanager.getGuild(message.guild);

            text += !db.settings.welcome.capchat.enabled ?`\n:warning: Le system de capchat n'est pas activé \`${db.prefix}configuration set capchat enabled\`` :'';
            text += !db.settings.welcome.enabled ?`\n:warning: Le system de bienvenue n'est pas activé \`${db.prefix}configuration set welcome enabled\`` :'';
            text += !db.settings.welcome.capchat.unverifiedRole ?`\n:warning: Il manque un role pour les personne non verifier \`${db.prefix}configuration set capchat unverifiedrole <nom du role>\`` :'';
            text += !db.settings.welcome.capchat.channel ?`\n:warning: Il manque un channel de pour les personne non verifier \`${db.prefix}configuration set capchat channel <nom du channel>\`` :'';
            text += !db.settings.welcome.autorole ?`\n:warning: Il manque un role pour les personne verifier \`${db.prefix}configuration set welcome autorole <nom du role>\`` :'';
            message.channel.send(text)
        }
       async function setCapchat(client) {
           let db =  await client.dbmanager.getGuild(message.guild);
           let channels = message.guild.channels.cache.find(c => c.id === db.settings.welcome.capchat.channel );
           if(!channels) return;
           let roles = message.guild.roles.cache.find(c => c.id === db.settings.welcome.capchat.unverifiedRole);
           if(!roles) return;
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


       switch (args[0]) {
            case undefined:
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
                });
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

                    case undefined:
                        return message.channel.send({
                            embed:{
                                description:'Aide de la commande configuration',
                                fields:[
                                    {
                                        name:"Paramettre",
                                        value:"capchat/logs/welcome/ignorerole/blacklistwords/prefix"
                                    },
                                    {
                                        name:"Exemple",
                                        value: `${guildData.prefix}configuration set capchat <unverifiedrole/channel/enabled> <nom du role/mention du role/nom du channel/mention du channel>\n`+
                                            `${guildData.prefix}configuration set logs <nom du channel/mention du channel>\n`+
                                            `${guildData.prefix}configuration set blacklistwords <on/mot ou phrase>\n`+
                                            `${guildData.prefix}configuration set welcome <enabled/autorole> <on/nom du role>\n`+
                                            `${guildData.prefix}configuration set ignorerole <nom du role>\n`+
                                            `${guildData.prefix}configuration set prefix <prefix>`

                                    }
                                ]
                            }
                        })
                    case "logs":
                        let channel = message.mentions.channels.first() ? message.mentions.channels.first() : args.slice(2) ? args.slice(2).join(' ').toLowerCase() : false;
                        channel = channel ? message.mentions.channels.first() ? channel.name : args.slice(2).join(' ').toLowerCase() : message.channel.name;
                        channel = message.guild.channels.cache.find(c => c.name === channel || c.id === channel);
                        if (guildData.channels.logs === channel.id) return super.respond(`Le channel de logs est deja mis sur ${channel.name}`);
                        guildData.channels.log = channel.id;
                        await this.client.dbmanager.updateGuild(message.guild, {channels:guildData.channels });
                        if(!channel.permissionsFor(message.guild.member(this.client.user)).has("SEND_MESSAGES")){
                            text = text + `\n:warning: je n'est pas la permission d'écrire dans ${channel}`
                        }
                        super.respond(`Les logs sont mis sur ${channel.name}${text}`);
                        break;
                    case "capchat":
                        switch (args[2]) {
                            case "enabled":
                                guildData.settings.welcome.capchat.enabled = true;
                                await this.client.dbmanager.updateGuild(message.guild, {settings:guildData.settings});
                                text = text + 'Le capchat est activé\n';
                                await makeMessage(text, this.client);
                                await setCapchat(this.client);
                                break;
                            case "unverifiedrole":
                                let roles = message.mentions.roles.first() ? message.mentions.roles.first() : args.slice(3) ? args.slice(3).join(' ').toLowerCase() : false;
                                roles = message.mentions.roles.first() ? roles.name : args.slice(3).join(' ').toLowerCase();
                                roles = message.guild.roles.cache.find(r => r.name.toLowerCase() === roles || r.id === roles);
                                if (!roles) return message.channel.send("Le role est introuvable");

                                guildData.settings.welcome.capchat.unverifiedRole = roles.id;
                                await this.client.dbmanager.updateGuild(message.guild, {settings:guildData.settings});
                                text = text + `Le role pour les personne non verifier est mis a jour ${roles.name}\n`;
                                await makeMessage(text, this.client);
                                await setCapchat(this.client);
                                break;
                            case "channel":
                                let channel = message.mentions.channels.first() ? message.mentions.channels.first() : args.slice(3) ? args.slice(3).join(' ').toLowerCase() : false;
                                channel = channel ? message.mentions.channels.first() ? channel.name : args.slice(3).join(' ').toLowerCase() : message.channel.name;
                                channel = message.guild.channels.cache.find(c => c.name.toLowerCase() === channel || c.id === channel);
                                if (!channel) return message.channel.send("Le channel est introuvable");

                                guildData.settings.welcome.capchat.channel = channel.id;
                                await this.client.dbmanager.updateGuild(message.guild, {settings:guildData.settings});
                                text = text +`Le channel pour les personne non verifier est mis a jour sur ${channel.name}\n`;
                                await makeMessage(text, this.client);
                                await setCapchat(this.client);
                                break;
                            case undefined:
                                return message.channel.send({
                                    embed:{
                                        description:'Aide de la commande capchat',
                                        fields:[
                                            {
                                                name:"Paramettre",
                                                value:"unverifiedrole\nenabled\nchannel"
                                            },
                                            {
                                                name:"Exemple",
                                                value: `${guildData.prefix}configuration set capchat unverifiedrole <nom du role/mention du role>\n`+
                                                    `${guildData.prefix}configuration set capchat channel <nom du channel/mention du channel>\n`+
                                                    `${guildData.prefix}configuration set capchat enabled`
                                            }
                                        ]
                                    }
                                })
                        }
                        break;
                    case "welcome":
                        switch (args[2]) {
                            case "enabled":
                                text = text + 'Le system de bienvenue est activé\n';

                                guildData.settings.welcome.enabled = true;
                                await this.client.dbmanager.updateGuild(message.guild, {settings:guildData.settings});
                                await makeMessage(text, this.client);
                                break;
                            case "autorole":
                                let roles = message.mentions.roles.first() ? message.mentions.roles.first() : args.slice(3) ? args.slice(3).join(' ').toLowerCase() : false;
                                roles = message.mentions.roles.first() ? roles.name : args.slice(3).join(' ').toLowerCase();
                                roles = message.guild.roles.cache.find(r => r.name.toLowerCase() === roles || r.id === roles);
                                if (!roles) return message.channel.send("Le role est introuvable");
                                guildData.settings.welcome.autorole = roles.id;
                                await this.client.dbmanager.updateGuild(message.guild, {settings:guildData.settings});
                                text = text +`L'autorole est sur ${roles.name}\n`;
                                await makeMessage(text, this.client);
                                break;
                            case undefined:
                                return message.channel.send({
                                    embed:{
                                        description:'Aide de la commande welcome',
                                        fields:[
                                            {
                                                name:"Paramettre",
                                                value:"enabled\nautorole"
                                            },
                                            {
                                                name:"Exemple",
                                                value: `${guildData.prefix}configuration set welcome autorole <nom du role/mention du role>\n`+
                                                    `${guildData.prefix}configuration set welcome enabled`
                                            }
                                        ]
                                    }
                                })
                        }
                        break;
                    case "ignorerole":
                        let roles = message.mentions.roles.first() ? message.mentions.roles.first() : args.slice(2) ? args.slice(2).join(' ').toLowerCase() : false;
                        if (!roles) return message.channel.send("Le roles est introuvable");
                        roles = message.mentions.roles.first() ? roles.name : args.slice(2).join(' ').toLowerCase();
                        roles = message.guild.roles.cache.find(r => r.name === roles || r.id === roles);
                        if (!roles) return message.channel.send("Le roles est introuvable");
                        if (guildData.badwords.ignore_role.includes(roles.id)) return super.respond(`Le role ${roles.name} est deja dans la liste`);
                        guildData.badwords.ignore_role.push(roles.id);
                        await this.client.dbmanager.updateGuild(message.guild, {badwords: guildData.badwords});
                        super.respond(`Le role ${roles.name} est maintenant ignoré`);
                        break;

                    case "blacklistwords":
                        switch (args[2]) {
                            case "on":
                                guildData.badwords.active = true;
                                await this.client.dbmanager.updateGuild(message.guild, {badwords: guildData.badwords});
                                return super.respond(`La blacklist word est activé`);
                        }
                        if (!args[2]) {
                            return message.channel.send({
                                embed:{
                                    description:'Aide de la commande configuration du badword',
                                    fields:[
                                        {
                                            name:"Paramettre",
                                            value:"on/mot ou phrase"
                                        },
                                        {
                                            name:"Exemple",
                                            value:`${guildData.prefix}configuration set blacklistwords on\n`+
                                                `${guildData.prefix}configuration set blacklistwords mot ou phrase\n`

                                        }
                                    ]
                                }
                            })
                        }
                        let words = args.slice(2).join(' ');
                        if (guildData.badwords.list.includes(words)) return super.respond(`Le mot ${words} est déja listé`);
                        guildData.badwords.list.push(words);
                        await this.client.dbmanager.updateGuild(message.guild, {badwords: guildData.badwords});
                        super.respond(`Le mot ${words} est blacklist`);
                        break;
                    case "prefix":
                        if (!args.slice(2).toString()) return super.respond('Merci de definir un prefix');
                        if (args.slice(2).join(' ').length >= 3) return super.respond(`Le prefix doit avoir moins de  **3** characters`);
                        if (args.slice(2).join(' ').includes('*') || args.slice(2).join(' ').includes('_') || args.slice(2).join(' ').includes('~') || args.slice(2).join(' ').includes('`')) return super.respond(`Les caracterres \`*\`, \`_\`, \`~\`, \`~\`, \`\`\` ne sont pas accepté`);
                        await this.client.dbmanager.updateGuild(message.guild, {prefix: args.slice(2).join('')});
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
                        if (!guildData.badwords.ignore_role.includes(roles.id)) return super.respond(`Le role ${roles.name} n'est pas listé`);
                        let ignoredRole = guildData.badwords.ignore_role;
                        let newIgnoredRole = [];
                        ignoredRole.forEach(role => {
                            if (role !== roles.id) {
                                newIgnoredRole.push(role)
                            }
                            guildData.badwords.ignore_role = newIgnoredRole;
                        });
                        await this.client.dbmanager.updateGuild(message.guild, {badwords: guildData.badwords});
                        super.respond(`Le role ${roles.name} a etait supprimé`);
                        break;
                    case "blacklistwords":
                        let words = args.slice(2).join(' ');
                        if (!guildData.badwords.list.includes(words)) return super.respond(`Le mot ${words} n'est pas listé`);
                        let badWord = guildData.badwords.list;
                        let newBadWord = [];
                        badWord.forEach(role => {
                            if (role !== words) {
                                newBadWord.push(role)
                            }
                            guildData.badwords.list = newBadWord;
                        });

                        await this.client.dbmanager.updateGuild(message.guild, {badwords: guildData.badwords});

                        super.respond(`Le mot ${words} n'est plus blacklist`);
                        break;
                }
                break;
            case"view":
                let eventlist = ["Ajout/Mise a jour/Suppression de Channel","Ajout de channel AFK","Ajout de la bannierre du serveur","Ajout/Suprression de boost","Augmentation/Diminution du niveau du serveur","Ajout/Mise a jours/Suppression de membres","Changement de pseudo","Ajout/Suppression de role","Mise a jours de la region","Ajout/Suppression des invitations","Edition de message","Ajout/Suppression de message épinglé","Logs des invitation posté"];
                return message.channel.send({
                    embed: {
                        title: "Configuration du bot",
                        fields: [
                            {
                                name: '❱ Channel de logs',
                                value: message.guild.channels.cache.get(guildData.channels.log) ? message.guild.channels.cache.get(guildData.channels.log) : "Pas de channel"
                            },
                            {
                                name: "❱ Systeme mauvais mot",
                                value: guildData.badwords.active ? "Activé" : "Désactivé"
                            },
                            {
                                name: "❱ Role ignoré",
                                value: guildData.badwords.ignore_role.map(id => message.guild.roles.cache.get(id) ? message.guild.roles.cache.get(id) : "Role introuvable").join(" ") || "Pas de roles"
                            },
                            {
                                name: "❱ Liste des mauvais mot",
                                value: guildData.badwords.list.map(badword => badword).join(", ") || "Pas de roles"
                            },
                            {
                                name: "❱ Capchat",
                                value: `Channel: ${message.guild.channels.cache.get(guildData.settings.welcome.capchat.channel)? message.guild.channels.cache.get(guildData.settings.welcome.capchat.channel).name : "Pas de channel"}\nRole: ${message.guild.roles.cache.get(guildData.settings.welcome.capchat.unverifiedRole) ? message.guild.roles.cache.get(guildData.settings.welcome.capchat.unverifiedRole).name : "Pas de role"}`
                            },
                            {
                                name: "❱ Autorole",
                                value: `${message.guild.roles.cache.get(guildData.settings.welcome.autorole) ? message.guild.roles.cache.get(guildData.settings.welcome.autorole).name : "Pas de role"}`
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

