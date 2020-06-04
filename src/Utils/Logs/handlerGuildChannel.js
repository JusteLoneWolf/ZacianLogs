module.exports = (client, oldChannel,newChannel) => {
    if (oldChannel.permissionOverwrites !== newChannel.permissionOverwrites) {
        console.log(1)
        client.emit('guildChannelPermissionsUpdate',oldChannel,newChannel);
    }
    if (oldChannel.type === 'text' && oldChannel.topic !== newChannel.topic) {
        client.emit(
            'guildChannelTopicUpdate',oldChannel,newChannel);
    }

};
