module.exports = (client, oldMember,newMember) =>{

    let addedRoles = [];
    newMember.roles.cache.forEach(role => {
        if (!oldMember.roles.cache.has(role.id)) addedRoles.push(role);
    });
    let removedRoles = [];
    oldMember.roles.cache.forEach(role => {
        if (!newMember.roles.cache.has(role.id)) removedRoles.push(role);
    });


    if (!oldMember.premiumSince && newMember.premiumSince) {
        client.emit('guildMemberBoost', newMember);
    }

    if (oldMember.premiumSince && !newMember.premiumSince) {
        client.emit('guildMemberUnboost', newMember);
    }

    for(const role of addedRoles){
        console.log(role)
        client.emit('guildMemberRoleAdd', newMember, role);
    }

    for(const role in removedRoles){
        client.emit('guildMemberRoleRemove', oldMember, role);
    }

    if (oldMember.nickname !== newMember.nickname) {
        client.emit('guildMemberNicknameUpdate',oldMember, newMember);
    }



}