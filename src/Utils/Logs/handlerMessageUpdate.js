module.exports = (client, oldMessage,newMessage) =>{


    if (oldMessage.content !== newMessage.content) {
        client.emit('messageEdited', newMessage, oldMessage, newMessage);
    }
    if (newMessage.pinned !== oldMessage.pinned && newMessage.pinned === false) {
        client.emit('messageUnPinned', newMessage);
    }
    if (newMessage.pinned !== oldMessage.pinned && newMessage.pinned === true) {
        client.emit('messagePinned', newMessage);
    }
}