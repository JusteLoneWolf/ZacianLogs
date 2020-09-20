
module.exports =  async (client,guild) => {
    const newGuild = {
        GuildId: guild.id
    };
    await client.dbmanager.createGuild(newGuild);
    client.logger.info(`Nouveau serveur -> ${guild.name}`);


    let data = await client.dbmanager.getGuild(guild);


    await client.utils.fetchInvite(guild, data).then(() => {
        console.log(`Toutes les invitation get ${guild.id}`);
    }).catch((err) => {
        console.error(err)
    });

}