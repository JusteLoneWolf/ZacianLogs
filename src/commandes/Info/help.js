const Command = require('../../Base/Command');

class Help extends Command{
    constructor(client){
        super(client,{
            name:'help',
            description:'Envoi la page d\'aide',
            usage:`help`,
            coolDown: 5000,
            aliases:['h'],
            permission: 'READ_MESSAGES'
        });
    }

   async run(message,args){
        if(!args[0]){
            const categorie = [];
            await this.client.commands.forEach(async (c) => {
                if (!categorie.includes(c.help.category)) {
                    categorie.push(c.help.category);
                }
            });
            await message.channel.send({
                embed: {
                    title: this.client.user.username,
                    author: {
                        name: `${this.client.user.username} | Commands`,
                        icon_url: this.client.user.avatarURL()
                    },
                    description: `!help [command name] for more information `,
                    fields: categorie.sort().map(c => {
                        return {
                            name: c,
                            value: this.client.commands.filter((command) => command.help.category === c).map((command) => `\`${command.help.name}\``).join(`, `),
                        };
                    }),
                }
            })
        }
    }
}

module.exports = Help;