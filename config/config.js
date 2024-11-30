const db = require('mongodb').MongoClient
let  dbname = null
async function fixadbconnection (){
    try {
     let  dbdata = await db.connect("mongodb+srv://sanju:%230ef%23000%2C%23ffff@mernapp.blnm8.mongodb.net/?retryWrites=true&w=majority&appName=mernapp",{
         useNewUrlParser: true,
         useUnifiedTopology: true,
         serverSelectionTimeoutMS: 5000,
         connectTimeoutMS: 10000
     })
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
