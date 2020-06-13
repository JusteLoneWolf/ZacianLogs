const Command = require("../../Base/Command");
const {HELPER } = require("../../Utils/Constant/CommandeHelper");

class Help extends Command{
    constructor(client){
        super(client,HELPER.COMMANDS.INFO.HELP);
    }

   async run(message,args,guildData){
        if(!args[0]){
            const categorie = [];

                for(const c of this.client.commands.array()){
                    if (!categorie.includes(c.help.category)) {
                        categorie.push(c.help.category);
                    }
                }
            await message.channel.send({
                embed: {
                    title: this.client.user.username,
                    author: {
                        name: `${this.client.user.username} | Commandes`,
                        icon_url: this.client.user.avatarURL()
                    },
                    description: `${message.guild?guildData.prefix: "zac!"}help [nom de la commande] pour plus d'aide `,
                    fields: categorie.sort().map(c => {
                        return {
                            name: `❱ ${c}`,
                            value: this.client.commands.filter((command) => command.help.category === c).map((command) => `\`${command.help.name}\``).join(`, `),
                        };
                    }),
                }
            })
        }else{
            let command = args[0];
            if(this.client.commands.has(command)){
                command = this.client.commands.get(command);
            } else if (this.client.aliases.has(command)) {
                command = this.client.commands.get(this.client.aliases.get(command));
            }
            if(!command.conf) return message.channel.send("Cette commande n'existe pas");

           return message.channel.send({
                embed:{
                    title : `Page d'aide de ${command.help.name}`,
                    fields:[
                        {
                            name:'Description',
                            value:command.help.description
                        },
                        {
                            name:'Usage',
                            value:command.help.usage
                        },
                        {
                            name:'Aliase',
                            value:command.conf.aliases.join(', ')
                        },
                        {
                            name:'Exemple',
                            value:command.help.exemple
                        }
                    ]

                }
            })
        }
    }
}

module.exports = Help;