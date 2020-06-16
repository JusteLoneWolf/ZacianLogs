let guildData = {}
module.exports = {
   init: (client) => {
        client.guilds.cache.map(async guild =>{
           let data = await client.dbmanager.getGuild(guild);
            if(data){
               let addedGuild = {
                    id:guild.id,
                    channelsCounter: {
                        category: data.channels.counter.category,
                        member :  {
                            id:data.channels.counter.member.id,
                            centent:data.channels.counter.member.centent
                        },
                        bot : {
                            id:data.channels.counter.bot.id,
                            centent:data.channels.counter.bot.centent
                        },
                        all : {
                            id:data.channels.counter.all.id,
                            centent:data.channels.counter.all.centent
                        },
                        task:{
                            id:data.channels.counter.task.id,
                            centent:data.channels.counter.task.centent
                        }
                    }
                };
                Object.assign(guildData[guild.id],addedGuild)
            }
        })
    },

    add: () =>{

    },

    update: (client) =>{

    },

    delete: (client) =>{

    },
}