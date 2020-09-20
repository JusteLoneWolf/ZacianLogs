

module.exports =  async (client,oldMember,newMember) => {

        if (!newMember.guild.me.permissions.has(["SEND_MESSAGES", "VIEW_AUDIT_LOG", "EMBED_LINKS", "MANAGE_CHANNELS", "MANAGE_GUILD"], true)) return;

        let db = await client.dbmanager.getGuild(newMember.guild);
        if (!db) return;

        require('../../Utils/Logs/handlerMemberUpdate')(client, oldMember, newMember)
};