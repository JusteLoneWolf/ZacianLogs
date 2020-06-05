const {MessageCollector} = require("discord.js")

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(newMember) {
        let db = this.client.guildDB.get(newMember.guild.id);

        let roles = newMember.guild.roles.cache.find(r => r.id === db.welcome.autorole);
        let channels = newMember.guild.channels.cache.find(c => c.id === db.welcome.capchat.channel);
        if (db.welcome.enabled) {
            if (roles) {
                if (channels && db.welcome.capchat.enabled) {
                    let capchatRole = newMember.guild.roles.cache.find(r => r.id === db.welcome.capchat.unverifiedRole);
                    if (!capchatRole) {
                        newMember.guild.roles.create({
                            data: {
                                name: "Non verifié",
                            }
                        }).then(r => {
                            capchatRole = r
                        });
                    }
                    await capchatRole.setPermissions(0)
                    for (const channel of newMember.guild.channels.cache.array()) {
                        if (channel.id !== channels.id) {
                           if(channel.permissionsFor(capchatRole).has("SEND_MESSAGES") &&channel.permissionsFor(capchatRole).has("VIEW_CHANNEL") ) {
                               await channel.overwritePermissions([
                                   {
                                       id: capchatRole.id,
                                       deny: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                                   }
                               ])
                           }
                        }

                    }
                    newMember.roles.add(capchatRole).then(() => {
                        let code = makepassword(5);
                        try {
                            newMember.send(`Entre le code \`${code}\` dans ${channels}`)
                        } catch (e) {
                            this.client.logger.error(e);
                            channels.send(`Entre le code \`${code}\` dans ${channels}`)
                        }

                         let collector = newMember.guild.channels.cache.get(channels.id).createMessageCollector(newMember.id,{time : 60000})
                        collector.on("collect", message =>{
                            console.log(message)
                            if (message.content === code) {
                                newMember.roles.remove(capchatRole).then(() => {
                                    message.delete()
                                    newMember.roles.add(roles)
                                })
                            }
                        })
                        /*i*/



                    })
                } else {
                    newMember.roles.add(roles)
                }
            }

        }

        function makepassword(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return result;
        }
    }
}

//TODO
// Capchat
