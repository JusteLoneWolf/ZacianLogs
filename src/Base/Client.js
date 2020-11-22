const {Client, Collection} = require("discord.js"),
    {readdir} = require("fs"),
    option = require("../../option"),
    Logger = require("../Utils/Logger"),
    Utils = require("../Utils/utils"),
    DatabaseManager = require("../Utils/DatabaseManager"),
    TwitClient = require('./TwitClient')

class ZacianBot extends Client {
    constructor(options) {
        super(options);
        ["commands","aliases","cooldowns","antiraid"].forEach(x=>this[x] = new Collection());
        this.option = require("../../option");
        require("../Utils/errorHandler")(this.client);
        this.config = this.option.config;
        this.web = this.option.dashboard;
        this.logger = new Logger();
        this.utils = new Utils();
        this.config = option.config || {};
        this.dbmanager = new DatabaseManager(this);
        this.twit = new TwitClient()
    }
    init = () => {
        this._commandLoader();
        this._eventLoader();
        this._connect().then(() =>{
            console.log('Bot pret a l\'emploit')
        } );
    }

    _connect = async () => {
        require('../Utils/mongoose').init().then(()=>{
            if(!this.option.config.token) throw new Error("Token du bot introuvable dans option.js veuillez verifier le fichier .env ou le README.md");
            return super.login(this.option.config.token)
        })

    }



    _commandLoader= () => {
        readdir("./src/commandes/", (err, files) => {
            if (err) this.emit("error", err);
            for (const dir of files) {
                readdir(`./src/commandes/${dir}/`, (err, commands) => {
                    if (err) this.emit("error", err);
                    for (const com of commands) {
                        try {
                            if (!com) return;
                            const command = new (require(`../commandes/${dir}/${com}`))(this);
                            this.commands.set(command.help.name, command);
                            command.conf.aliases.forEach(a => this.aliases.set(a, command.help.name));
                            this.logger.info(`[Client] ${com} chargé`)
                        } catch (e) {
                            this.emit("error", `[Client] ${com} n"a pas chargé ${e.message}`)
                        }
                    }

                })
            }
        });
        return this
    }

    _eventLoader= () => {
        readdir("./src/events", (err, files) => {
            if (!files) return;
            if (err) this.emit("error", err);
            for (const dir of files) {
                readdir(`./src/events/${dir}`, (err, file) => {
                    if (!file) return;
                    if (err) this.emit("error", err);
                    for (const evt of file) {
                        try {
                            if (!evt) return;
                            const event =require(`../events/${dir}/${evt}`);
                            this.logger.info(`[Client] ${evt} chargé`);
                            super.on(evt.split(".")[0], event.bind(null, this));
                        } catch (e) {
                            this.emit("error", `[Client] ${evt} n"a pas chargé ${e.stack}`)
                        }
                    }
                })
            }
        });
        return this
    }
}

module.exports = ZacianBot;
