module.exports = (client, oldMessage, newMessage) => {

    try {
        if (oldMessage.content !== newMessage.content) {
            client.emit("messageEdited", oldMessage, newMessage);
        }
        if (newMessage.pinned !== oldMessage.pinned && newMessage.pinned === false) {
            client.emit("messageUnPinned", newMessage);
        }
        if (newMessage.pinned !== oldMessage.pinned && newMessage.pinned === true) {
            client.emit("messagePinned", newMessage);
        }
    } catch (err) {
        console.error(err)
    }

};
