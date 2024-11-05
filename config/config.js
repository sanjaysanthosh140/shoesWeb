const db = require('mongodb').MongoClient
let  dbname = null
async function fixadbconnection (){
    try {
     let  dbdata = await db.connect("mongodb://localhost:27017")
     if(dbdata){
         dbname = dbdata.db('shoesStore')
        if(!dbname){
            console.log('notconnected')
        }else{
            console.log('connected')
        }
     }else{
        console.log('main connection is not working yet')
     }
    } catch (error) {
        console.log(error)
    }
}

fixadbconnection()


module.exports={
    get:function(){
           return dbname
    }
}