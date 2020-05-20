const { Client, Collection} = require('discord.js'),
     { readdir } = require('fs');

class StructureBot extends Client{

    constructor(options){
        super(options.clientOption || {});
        this.command = new Collection();
        this.aliase = new Collection();

        this.config = options.config ? require(`../${options.config}`) : {}
    }
    login(token){
        super.login(token)
    }

    commandloader(path){
        readdir(path,(err,files) =>{
            if(err) this.emit('error');
            files.forEach(dir =>{
                readdir(`../${path}/${dir}`,(err,com)=>{
                    com.forEach(com =>{
                        try {
                            const command = new(require(`../${path}/${dir}/${com}`));
                            this.command.set(command.name,command);
                            this.aliase.forEach(alias => this.aliase.set(alias,command.help))
                        }catch (e) {
                            this.emit('error')
                        }
                    })

                })

            })
        });
        return this
    }
    eventloader(path){
        readdir(path,(err,files) =>{
            if(err) this.emit('error');
            files.forEach(dir =>{
                readdir(`../${path}/${dir}`,(err,file)=>{
                    file.forEach(evt =>{
                        try {
                            const event = new(require(`../${path}/${dir}/${evt}`))(this);
                            super.on(evt.split('.')[0], (...args) =>event.run(...args));
                        }catch (e) {
                            this.emit('error')
                        }
                    })
                })
            })
        });
        return this
    }
}

module.exports = StructureBot;