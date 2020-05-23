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
        INFO:{
            HELP:{
                name:'help',
                description:'Envoi la page d\'aide',
                usage:`help`,
                coolDown: 5000,
                aliases:['h'],
                permission: 'READ_MESSAGES'
            }
        }
    }
}

exports.HELPER = HELPER;