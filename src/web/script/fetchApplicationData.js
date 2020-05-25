async function fetchApplicationData(client) {
    client.fetchApplication().then((data)=>{
       return  new Promise((resolve, reject) => {
           try {
               resolve(data)
           }catch (e) {
               reject(e)
           }

       })
    })
}

module.exports = fetchApplicationData()