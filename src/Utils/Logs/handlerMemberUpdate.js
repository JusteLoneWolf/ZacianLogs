module.exports = (client, oldMember,newMember) =>{
    let listed = false

    if (!oldMember.premiumSince && newMember.premiumSince) {
        client.emit('guildMemberBoost', newMember);
    }

    if (oldMember.premiumSince && !newMember.premiumSince) {
        client.emit('guildMemberUnboost', newMember);
    }

    for(const role of getAddedRole()){
        console.log(role)
        client.emit('guildMemberRoleAdd', newMember, role);
        listed = true
    }

    for(const role in getRemoveRole()){
        client.emit('guildMemberRoleRemove', newMember, role);
        listed = true
    }

    if (oldMember.nickname !== newMember.nickname) {
        client.emit('guildMemberNicknameUpdate',oldMember, newMember);
        listed = true
    }

    function getAddedRole(){
        let addedRoles = [];
        newMember.roles.cache.forEach(role => {
            if (!oldMember.roles.cache.has(role.id)) addedRoles.push(role);
        });
        return addedRoles
    }
    function getRemoveRole(){
        let removedRoles = [];
        oldMember.roles.cache.forEach(role => {
            if (!newMember.roles.cache.has(role.id)) removedRoles.push(role);
        });
        return removedRoles
    }
    if(listed){
        client.emit('unhandledGuildMemberUpdate', oldMember, newMember);
    }



}