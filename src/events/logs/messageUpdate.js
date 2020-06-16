
module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(oldMessage,newMessage) {
        if (newMessage.author.bot) return;
        let db = await this.client.dbmanager.getGuild(newMessage.guild);
        if (!db) return;

        if(newMessage.channel.type ==="dm" || newMessage.author.bot) return;
        require('../../Utils/Logs/handlerMessageUpdate')(this.client,oldMessage,newMessage)

    }
};