export = (client, oldMember,newMember) =>{
    if (!oldMember.premiumSince && newMember.premiumSince) {
        client.emit('guildMemberBoost', newMember);
    }

    if (oldMember.premiumSince && !newMember.premiumSince) {
        client.emit('guildMemberUnboost', newMember);
    }



}