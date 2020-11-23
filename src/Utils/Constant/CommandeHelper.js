const HELPER = {
    COMMANDS :{
        GENERICS:{
            PING:{
                name:"ping",
                description:"Envoi le ping du bot",
                usage:`ping`,
                cooldowns: 5000,
                aliases:["pong","p"],
                permission: "READ_MESSAGES",
                category:"Générique",
                mention:true
            },
        },
        OWNER:{
            EVAL:{
                name:"eval",
                description:"Fait un eval",
                usage:`eval [code]`,
                cooldowns: 1000,
                aliases:["e"],
                permission: "READ_MESSAGES",
                category:"Owner",
                mention:false
            },
            TWEET:{
                name:"tweet",
                description:"Fait un tweet",
                usage:`tweet [message]`,
                cooldowns: 1000,
                aliases:["e"],
                permission: "READ_MESSAGES",
                category:"Owner",
                mention:false
            },
        },
        INFO:{
            HELP:{
                name:"help",
                description:"Envoi la page d\'aide",
                usage:`help`,
                cooldowns: 5000,
                aliases:["h"],
                permission: "READ_MESSAGES",
                allowDMs: true,
                category:"Information",
                mention:true
            },
            INFO:{
                name:"stats",
                description:"Stats les bot",
                usage:"stats",
                cooldowns:2000,
                aliases:["info"],
                permission: "READ_MESSAGES",
                category:"Information",
                mention:true
            },
            BOTINFO:{
                name:"botinfo",
                description:"Envoi la page d\'information du bot",
                usage:`botinfo`,
                cooldowns: 5000,
                aliases:["bi"],
                permission: "READ_MESSAGES",
                allowDMs: true,
                category:"Information",
                mention:false
            },
        },
        MOD:{
          WARN:{
              name:"warn",
              description:"Averti un utilisateur",
              usage:"warn [user] <raison>",
              cooldowns:1000,
              aliases:["w"],
              permission: "BAN_MEMBERS",
              category:"Modération",
              mention:true
          },
            LOCKDOWN:{
                name:"lockdown",
                description:"Bloque tous les channels",
                usage:"lockdown <time> <raison>",
                cooldowns:10000,
                aliases:["lc"],
                permission: "BAN_MEMBERS",
                category:"Modération",
                mention:true
            },
            UNWARN:{
                name:"unwarn",
                description:"Enleve un avertissement a un utilisateur",
                usage:"unwarn [user] <warn>",
                cooldowns:1000,
                aliases:["uw"],
                permission: "BAN_MEMBERS",
                category:"Modération",
                mention:true
            },
            LISTWARN:{
                name:"warnlist",
                description:"Liste les avertissement d'un utilisateur",
                usage:"warnlist [user]",
                cooldowns:3000,
                aliases:["lw"],
                permission: "BAN_MEMBERS",
                category:"Modération",
                mention:true
            },
            KICK:{
                name:"kick",
                description:"Kick un utilisateur",
                usage:"kick [user] <raison>",
                cooldowns:1000, aliases:["k"],
                permission: "KICK_MEMBERS",
                category:"Modération",
                mention:true
            },
            BAN:{
                name:"ban",
                description:"Ban un utilisateur",
                usage:"ban [user] <raison>",
                cooldowns:1000,
                aliases:["b"],
                permission: "BAN_MEMBERS",
                category:"Modération",
                mention:true
            },
            MUTE:{
                name:"mute",
                description:"Mute un utilisateur",
                usage:"mute [user] <raison>",
                cooldowns:1000,
                aliases:["m"],
                permission: "MANAGE_MEMBERS",
                category:"Modération",
                mention:true
            },
            CHECKUSER:{
                name:"checkuser",
                description:"Verifie le status des utilisateur",
                usage:"checkuser",
                cooldowns:10000,
                aliases:["m"],
                permission: "MANAGE_MEMBERS",
                category:"Modération",
                mention:true
            },
            PURGE:{
                name:"purge",
                description:"Supprime des message",
                usage:"purge <mention/all/search>",
                args:[
                    {
                        arg: 'zac!purge mention',
                        description: 'Supprime les messages d\'un utilisateur mentionné',
                        usage: 'zac!pruge @[Dev] zechaos#2310 5'
                    },
                    {
                        arg: 'zac!purge all',
                        description: 'Supprime n\'importe quelles messages',
                        usage: 'zac!pruge all 5'
                    },
                    {
                        arg: 'zac!purge search',
                        description: 'Supprime les messages qui contient une chaine de character',
                        usage: 'zac!pruge search bonjour'
                    }
                ],
                cooldowns:2000,
                aliases:["p"],
                permission: "MANAGE_MEMBERS",
                category:"Modération",
                mention:true
            },
            VOICEKICK:{
                name:"voicekick",
                description:"Kick un utilisateur dans un vocal",
                usage:"voicekick [user]",
                cooldowns:1000,
                aliases:["p"],
                permission: "MANAGE_MEMBERS",
                category:"Modération",
                mention:true
            },
            UNMUTE:{
                name:"unmute",
                description:"Unmute un utilisateur",
                usage:"unmute [user] <raison>",
                cooldowns:1000,
                aliases:["um"],
                permission: "MANAGE_MEMBERS",
                category:"Modération",
                mention:true
            },
            LISTMUTE:{
                name:"mutelist",
                description:"Liste les mute d'un utilisateur",
                usage:"mutelist [user]",
                cooldowns:3000,
                aliases:["lm"],
                permission: "BAN_MEMBERS",
                category:"Modération",
                mention:true
            },
            CHECKINVITE:{
                name:"checkinvite",
                description:"Donne les information d'une invitation",
                usage:"checkinvite [invitation]",
                cooldowns:1000,
                aliases:["wi"],
                permission: "MANAGE_GUILD",
                category:"Admin",
                mention:true
            },
            UNLOCKDOWN :{
                name:"unlockdown",
                description:"Débloque tous les channels",
                usage:"unlockdown <time> <raison>",
                cooldowns:10000,
                aliases:["ulc"],
                permission: "BAN_MEMBERS",
                category:"Modération",
                mention:true
            },
            POLL: {
                name:"poll",
                description:"Débloque tous les channels",
                usage:"poll <time> <raison>",
                cooldowns:10000,
                aliases:["ulc"],
                permission: "BAN_MEMBERS",
                category:"Modération",
                mention:true
            }
        },
        ADMIN:{
            CONFIGURATION:{
                name:"configuration",
                description:"Configure le bot",
                usage:"configuration <set/remove/view> <logs/ignorerole/blacklistwords/prefix/capchat/welcome> [channel/mention channel/role/mot/unverifiedrole/autorole/enabled] [role/channel]",
                exemple: "zac!configuration set logs #ChannelMention/nom du channel \nzac!configuration set ignorerole @roleMemtion/role name\nzac!configuration set prefix !\nzac!configuration set capchat unverifiedrole role\nzac!configuration set capchat enabled ",
                cooldowns:1000,
                aliases:["conf","config"],
                permission: "MANAGE_GUILD",
                args:[
                    {
                        arg: 'zac!configuration set capchat <enabled/unverifiedrole/channel>',
                        description: 'Met le capchat et le configure',
                        usage: 'zac!configuration set capchat enabled\nzac!configuration set capchat unverifiedrole @pas verifier\nzac!configuration set capchat channel #verif'
                    },
                    {
                        arg: 'zac!configuration set welcome <enabled/autorole>',
                        description: 'Met l\'autorole, si le capchat et mis ce role seras mis une fois l\'utilisateur vérifié',
                        usage: 'zac!configuration set welcome enabled\nzac!configuration set welcome autorole @membre'
                    },
                    {
                        arg: 'zac!configuration <set/remove> <ignorerole/blacklistwords>',
                        description: 'Met ou supprime les role ignoré ou les mot blacklist',
                        usage: 'zac!configuration set ignorerole @modo\nzac!configuration remove ignorerole @modo'
                    }
                ],
                category:"Admin",
                mention:false
            },
            CHECKPERMISSION:{
                name:"checkpermission",
                description:"Regarde les permission du bot dans chaque channel",
                usage:"checkpermission",
                cooldowns:1000,
                aliases:["cp"],
                permission: "MANAGE_MEMBERS",
                category:"Admin",
                mention:false
            },
            WHITELISTINVITE:{
                name:"whitelistinvite",
                description:"Met une whitelist sur le systeme de supprssion de sinvitation automatique",
                usage:"whitelistinvite add [invitation]",
                cooldowns:1000,
                aliases:["wi"],
                permission: "MANAGE_GUILD",
                category:"Admin",
                mention:false
            }
        }

    }
};

module.exports.HELPER = HELPER;
