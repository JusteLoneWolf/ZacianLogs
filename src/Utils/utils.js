class Utils {
    constructor() {
        
    }

    parseMessage(content){
       return content.replace(/@(everyone|here)/g, '@\u200b$1').replace(/\u202e/g, '')
    }
}

module.exports = Utils;