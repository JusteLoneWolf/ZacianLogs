

module.exports = class {
    constructor(client) {
        this.client = client;
    }
    run(oldMember,newMember){
       require('../../Utils/Logs/handlerMemberUpdate')(this.client,oldMember,newMember)
    }
}