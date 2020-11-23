module.exports = async (client, oldGuild, newGuild) => {

    if (!newGuild.me.permissions.has(["SEND_MESSAGES", "VIEW_AUDIT_LOG", "EMBED_LINKS", "MANAGE_CHANNELS", "MANAGE_GUILd"], true)) return;

    let db = await client.dbmanager.getGuild(newGuild);
    if (!db) return;

    require("../../Utils/Logs/handlerGuildUpdate")(client, oldGuild, newGuild)
};
