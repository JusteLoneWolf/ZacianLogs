const HELPER = {
    COMMANDS :{
        GENERICS:{
            PING:{
                name:"ping",
                description:"Envoi le ping du bot",
                usage:`ping`,
                coolDown: 5000,
                aliases:["pong","p"],
                permission: "READ_MESSAGES",
                category:"Générique"
            },
            SAY:{
                name:"say",
                description:"Envoi le ping du bot",
                usage:`say`,
                coolDown: 5000,
                aliases:["say"],
                permission: "READ_MESSAGES",
                category:"Générique"
            }
        },
        OWNER:{
            EVAL:{
                name:"eval",
                description:"Fait un eval",
                usage:`eval [code]`,
                coolDown: 2000,
                aliases:["e"],
                permission: "READ_MESSAGES",
                category:"Owner"
            },
            TEST:{
                name:"test",
                description:"Commande de test",
                usage:`test `,
                coolDown: 2000,
                aliases:[],
                permission: "READ_MESSAGES",
                category:"Owner"
            }
        },
        INFO:{
            HELP:{
                name:"help",
                description:"Envoi la page d\'aide",
                usage:`help`,
                coolDown: 5000,
                aliases:["h"],
                permission: "READ_MESSAGES",
                allowDMs: true,
                category:"Information"
            },
            INFO:{
                name:"stats",
                description:"Stats les bot",
                usage:"stats",
                coolDown:2000,
                aliases:["info"],
                permission: "READ_MESSAGES",
                category:"Information"
            },
            BOTINFO:{
                name:"botinfo",
                description:"Envoi la page d\'information du bot",
                usage:`botinfo`,
                coolDown: 5000,
                aliases:["bi"],
                permission: "READ_MESSAGES",
                allowDMs: true,
                category:"Information"
            },
        },
        MOD:{
          WARN:{
              name:"warn",
              description:"Averti un utilisateur",
              usage:"warn [user] <raison>",
              coolDown:2000,
              aliases:["w"],
              permission: "BAN_MEMBERS",
              category:"Modération"
          },
            KICK:{
                name:"kick",
                description:"Kick un utilisateur",
                usage:"kick [user] <raison>",
                coolDown:2000, aliases:["k"],
                permission: "KICK_MEMBERS",
                category:"Modération"
            },
            BAN:{
                name:"ban",
                description:"Ban un utilisateur",
                usage:"ban [user] <raison>",
                coolDown:2000,
                aliases:["b"],
                permission: "BAN_MEMBERS",
                category:"Modération"
            },
            MUTE:{
                name:"mute",
                description:"Mute un utilisateur",
                usage:"mute [user] <raison>",
                coolDown:2000,
                aliases:["m"],
                permission: "MANAGE_MEMBERS",
                category:"Modération"
            },
            UNMUTE:{
                name:"unmute",
                description:"Unmute un utilisateur",
                usage:"unmute [user] <raison>",
                coolDown:2000,
                aliases:["um"],
                permission: "MANAGE_MEMBERS",
                category:"Modération"
            }
        },
        ADMIN:{
            CONFIGURATION:{
                name:"configuration",
                description:"Configure le bot",
                usage:"configuration <set/remove/view> <logs/ignorerole/blacklistwords/prefix/capchat/welcome> [channel/mention channel/role/mot/unverifiedrole/autorole/enabled] [role/channel]",
                exemple: "zac!configuration set logs #ChannelMention/nom du channel \nzac!configuration set ignorerole @roleMemtion/role name\nzac!configuration set prefix !\nzac!configuration set capchat unverifiedrole role\nzac!configuration set capchat enabled ",
                oolDown:2000,
                aliases:["conf","config"],
                permission: "MANAGE_GUILD",
                category:"Admin"
            }
        }

    }
};

module.exports.HELPER = HELPER;