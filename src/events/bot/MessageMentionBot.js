module.exports = {
    execute: (message,client)=>{
        const command = message.content.split(' ').slice(1);
        console.log(command ==='resetprefix')
        if(command ==='resetprefix'){
            console.log(1)
        }
    }
}