
    module.exports = (client, oldGuild,newGuild) =>{
    if (oldGuild.premiumTier < newGuild.premiumTier) {
        client.emit('guildBoostLevelUp', oldGuild, newGuild);
    }
    if (oldGuild.premiumTier > newGuild.premiumTier) {
        client.emit('guildBoostLevelDown', oldGuild, newGuild);
    }
    if (oldGuild.region !== newGuild.region) {
        client.emit('guildRegionUpdate',oldGuild, newGuild);
    }
    if (!oldGuild.banner && newGuild.banner) {
        client.emit('guildBannerAdd',oldGuild,newGuild);
    }
    if (!oldGuild.afkChannel && newGuild.afkChannel) {
        client.emit('guildAfkChannelAdd', oldGuild, newGuild);
    }
};
