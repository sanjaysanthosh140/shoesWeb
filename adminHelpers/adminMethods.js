const db = require('../config/config.js')
module.exports = {

storeProducts:(items)=>{
    return new Promise((resolve,reject)=>{
        try {
            db.get().collection('shoesInfo').insertOne(items).then((data)=>{
                if(data){
                    resolve(data.insertedId)
                }else{
                    console.log('no data find')
                }
            })
        } catch (error) {
            reject(error)
        }
        
    })

    }

  

}