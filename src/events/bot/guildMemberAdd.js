module.exports = async (client, newMember) => {
    let db = await client.dbmanager.getGuild(newMember.guild);
    if (!db) return;

    let roles = newMember.guild.roles.cache.find(r => r.id === db.settings.welcome.autorole);
    let channels = newMember.guild.channels.cache.find(c => c.id === db.settings.welcome.capchat.channel);
    if (db.settings.welcome.enabled) {
        if (roles) {
            if (channels && db.settings.welcome.capchat.enabled) {
                let capchatRole = newMember.guild.roles.cache.find(r => r.id === db.settings.welcome.capchat.unverifiedRole);
                if (!capchatRole) {
                    newMember.guild.roles.create({
                        data: {
                            name: "Non verifié",
                        }
                    }).then(r => {
                        capchatRole = r
                    });
                }
                await capchatRole.setPermissions(0);
                for (const channel of newMember.guild.channels.cache.array()) {
                    if (channel.id !== channels.id) {
                        if (channel.permissionsFor(capchatRole).has("SEND_MESSAGES") && channel.permissionsFor(capchatRole).has("VIEW_CHANNEL")) {
                            await channel.overwritePermissions([{
                                id: capchatRole.id,
                                deny: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                            }])
                        }
                    }

                }
                newMember.roles.add(capchatRole).then(() => {
                    let code = makepassword(5);
                    try {
                        newMember.send(`Entre le code \`${code}\` dans ${channels}`)
                    } catch (e) {
                        client.logger.error(e);
                        channels.send(`Entre le code \`${code}\` dans ${channels}`)
                    }
                    let collector = newMember.guild.channels.cache.get(channels.id).createMessageCollector(m => m.author.id === newMember.id, {
                        time: 60000
                    });
                    collector.on("collect", message => {
                        if (message.content === code) {
                            try {
                                if (channels.permissionsFor(client.user).has("MANAGE_MEMBERS", true)) {
                                    newMember.roles.remove(capchatRole).then(() => {
                                        message.delete();
                                        newMember.roles.add(roles).catch(() => {
                                            channels.send(`Je ne peux pas lui donné le role ${roles.name}`)
                                        })
                                    }).catch(() => {
                                        channels.send(`Je ne peux pas suprrimé le role ${capchatRole.name}`);
                                        newMember.roles.add(roles).catch(() => {
                                            channels.send(`Je ne peux pas lui donné le role ${roles.name}`)
                                        })
                                    })
                                }

                            } catch (e) {
                                client.emit("error", `Impossible de donner le rôle ${e.message}`)
                            }
                        }
                    })
                })
            } else {
                newMember.roles.add(roles)
            }
        }

    }

    function makepassword(length) {
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;

    }
}
