
module.exports = async (guild) => {
        let data = await this.client.dbmanager.getGuild(guild);
        if(!data) return;

        await this.client.dbmanager.removeGuild(guild).then(()=>{
            console.log('guild supprimé')
        })

};