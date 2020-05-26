module.exports = class {
    constructor(client) {
        this.client = client;
    }
    run(){

        this.client.fetchApplication().then((data)=> {
            this.client.logger.info(`${data.name} pret`)
            this.client.user.setPresence({activity:{name:`${this.client.config.prefix}help `, type:'LISTENING'}})
        });

        this.client.guilds.cache.forEach(guild =>{
            if(!this.client.guildDB.get(guild.id)) return;
            this.client.utils.fetchInvite(guild,this.client.guildDB).then(()=>{
                console.log(`Toutes les invitation get ${guild.id}`)
            })
        })



    }
};