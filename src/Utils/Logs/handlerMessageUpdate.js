module.exports = (client, oldMessage,newMessage) =>{


    if (oldMessage.content !== newMessage.content) {
        client.emit('messageEdited', newMessage, oldMessage, newMessage);
    }
    console.log(newMessage.pinned)
    if (newMessage.pinned === false) {
        client.emit('messageUnPinned', newMessage);
    }
    if (newMessage.pinned === true) {
        client.emit('messagePinned', newMessage);
    }
}