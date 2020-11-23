module.exports = async (client, message) => {

    if (!message.guild.me.permissions.has(["SEND_MESSAGES", "VIEW_AUDIT_LOG", "EMBED_LINKS", "MANAGE_CHANNELS", "MANAGE_GUILd"], true)) return;
    const urlRegex = require("url-regex");
    let url = message.content.match(urlRegex());
    if (!url) return;
    let scrapedURL = url[0].split("/");

    if (isNaN(scrapedURL[5]) || isNaN(scrapedURL[6])) return;
    try {
        client.guilds.cache.get(message.guild.id).channels.cache.get(scrapedURL[5]).messages.fetch(scrapedURL[6]).then((msg) => {
            if (!client.config.owner.includes(message.author.id)) return
            if (!msg) return;
            let data = [];
            if (msg.embeds[0] && msg.embeds[0].fields) {
                for (const fields of msg.embeds[0].fields) {
                    data.push(fields)
                }
            }

            return message.channel.send({
                embed: {
                    title: `Message de ${msg.author.username}`,
                    description: `[Le message](${url[0]})\n${msg.embeds[0] ? msg.embeds[0].description.length !== 0 ? msg.embeds[0].description : "Pas de description" : msg.content}`,
                    fields: data,
                },

            })
        }).catch((err) => {
            console.log(err)
        })
    } catch (err) {
        console.log(err)
    }
};
