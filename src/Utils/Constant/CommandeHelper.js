const HELPER = {
    COMMANDS :{
        GENERICS:{
            PING:{
                name:'ping',
                description:'Envoi le ping du bot',
                usage:`ping`,
                coolDown: 5000,
                aliases:['pong','p'],
                permission: 'READ_MESSAGES',
                category:'Générique'
            }
        },
        OWNER:{
            EVAL:{
                name:'eval',
                description:'Fait un eval',
                usage:`eval [code]`,
                coolDown: 2000,
                aliases:['e'],
                permission: 'READ_MESSAGES',
                category:'Owner'
            },
        },
        INFO:{
            HELP:{
                name:'help',
                description:'Envoi la page d\'aide',
                usage:`help`,
                coolDown: 5000,
                aliases:['h'],
                permission: 'READ_MESSAGES',
                category:'Information'
            },
            INFO:{
                name:'stats',
                description:'Stats les bot',
                usage:'stats',
                coolDown:2000,
                aliases:['info'],
                permission: 'READ_MESSAGES',
                category:'Information'
            }
        }
    }
}

module.exports.HELPER = HELPER;