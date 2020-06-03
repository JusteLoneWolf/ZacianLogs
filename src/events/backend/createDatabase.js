module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async run(message){
       if( this.client.guildDB.get(message.guild.id)){
           this.client.guildDB.ensure(message.guild.id, {
               prefix: this.client.config.prefix,
               id : message.guild.id,
               badwords:{
                   active: false,
                   list:[],
                   ignore_role:[],
                   ignore_channel:[],
                   ignore_members:[],
               },
               channels:{
                   logs:""
               },
               settings:{
                   punishment:{
                       enabled : false,
                       mute: 3,
                       kick: 5,
                       ban : 8,
                   },
                   roles:{
                       mute:""
                   }
               },
               warns: [],
               members: []
           });

           await this.client.utils.fetchInvite(message.guild,this.client.guildDB).then(()=>{
               console.log(`Toutes les invitation get ${message.guild.id}`);
           })
       }

    }
};