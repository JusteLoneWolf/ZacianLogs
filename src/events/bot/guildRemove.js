
module.exports = async (client,guild) => {
    let data = await client.dbmanager.getGuild(guild);
    if (!data) return;

    await client.dbmanager.removeGuild(guild).then(() => {
        console.log('guild supprimé')
    })

}