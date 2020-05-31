module.exports = (client, oldMember,newMember) =>{
    if (!oldMember.premiumSince && newMember.premiumSince) {
        client.emit('guildMemberBoost', newMember);
    }

    if (oldMember.premiumSince && !newMember.premiumSince) {
        client.emit('guildMemberUnboost', newMember);
    }

    for(let role of getAddedRole()){
        client.emit('guildMemberRoleAdd', newMember, role);
    }

    for(let role in getRemoveRole()){
        client.emit('guildMemberRoleRemove', newMember, role);
    }

    if (oldMember.nickname !== newMember.nickname) {
        client.emit('guildMemberNicknameUpdate',oldMember, newMember);
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
}