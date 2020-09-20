

module.exports = async (client,oldChannel,newChannel) => {
    if (!newChannel.guild.me.permissions.has(["SEND_MESSAGES", "VIEW_AUDIT_LOG", "EMBED_LINKS", "MANAGE_CHANNELS", "MANAGE_GUILD"], true)) return;

    let db = await client.dbmanager.getGuild(newChannel.guild);
    if (!db) return;
    require('../../Utils/Logs/handlerGuildChannel')(client, oldChannel, newChannel)

};