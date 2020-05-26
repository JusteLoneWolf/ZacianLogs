const { Client, Collection} = require('discord.js'),
        Enmap = require('enmap'),
     { readdir,existsSync,mkdirSync } = require('fs'),
    Logger = require('../Utils/logger'),
    option = require('../../option'),
    Utils = require('../Utils/utils');

class StructureBot extends Client{

    constructor(options) {
        super(options.clientOptions || {});
        this.commands = new Collection();
        this.aliases = new Collection();
        this.option = require('../../option');
        this.config = this.option.config
        this.perms = this.option.perm
        this.web = this.option.dashboard
        this.logger = new Logger(this);
        this.utils = new Utils();
        this.createFolder();
        this.guildDB = new Enmap({name: "guildDB", dataDir: './database'});
        this.userDB= new Enmap({name: "userDB", dataDir: './database'});
        this.config = option.config|| {}
    }
    init(token){

        this.initDatabase();
        this.commandLoader();
        this.eventLoader();
        this.login(token);
        return true
    }
    login(token){
        super.login(token)
    }

    commandLoader(){
        readdir('./src/commandes/',(err,files) =>{
            if(err)  this.emit('error',err);
            files.forEach(dir =>{
                readdir(`./src/commandes/${dir}/`,(err,commands)=>{
                    if(err)  this.emit('error',err)
                    commands.forEach(com =>{
                        try {
                            const command = new(require(`../commandes/${dir}/${com}`))(this);
                            this.commands.set(command.help.name, command);
                            command.conf.aliases.forEach(a => this.aliases.set(a, command.help.name));
                            this.logger.info(`${com} chargé`)

                        }catch (e) {
                            this.emit('error',`${com} n'a pas chargé ${e.message}`)
                        }
                    })

                })

            })
        });
        return this
    }
    eventLoader(){
        readdir('./src/events',(err,files) =>{
            if(!files) return;

            if(err) this.emit('error',err)
            files.forEach(dir =>{
                readdir(`./src/events/${dir}`,(err,file)=>{
                    if(!file) return;
                    if(err) this.emit('error',err)
                    file.forEach(evt =>{
                        if(!evt) return;
                        try {
                            const event = new(require(`../events/${dir}/${evt}`))(this);
                            this.logger.info(`${evt} chargé`);
                            super.on(evt.split('.')[0], (...args) =>event.run(...args));
                        }catch (e) {
                            this.emit('error',e)
                        }
                    })
                })
            })
        });
        return this
    }

    createFolder(){
        if (!existsSync('./database')) {
            mkdirSync('./database');
            this.logger.info('crée')
        }
        return true
    }
    initDatabase(){

        this.guildDB.defer.then(()=>{
            if (this.guildDB.isReady) {
                this.logger.info('[Guilddb] Base de donnée pret')
            } else {
                this.logger.info('[Guilddb] Base de donnée pas pret')
            }
        })
    }
}

module.exports = StructureBot;