const db = require('../config/config.js')
const bcrypt = require('bcrypt')
module.exports={

  displayprod:()=>{
    return new Promise(async(resolve,reject)=>{
        try {
         let value =   await db.get().collection('shoesInfo').find({},
                {_id:1,proname:1,proPrice:0}
            ).toArray()

            if(value){
                console.log(value)
                resolve(value)
            }else{
                console.log('value not yet')
            }
            
        } catch (error) {
            console.log(error)
        }
    })
  },
  usersIn:(users)=>{
    return new Promise(async(resolve,reject)=>{
        try {
         let user =   await db.get().collection('clients').findOne({email:users.email})
         if(!user){
            console.log(users)
            let salt = await bcrypt.genSalt()
            users.password = await bcrypt.hash(users.password,salt)
            console.log(users)
            await db.get().collection('clients').insertOne(users).then((data)=>{
                if(data){
                    resolve(data.insertedId)
                }else if(!data){
                    console.log('not data yet...')
                }

            })
         }else if(user){
                console.log('user already have an account')
         }
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
  },

   userLog:(userDet)=>{
    return new Promise(async(resolve,reject)=>{
        try {
          const user =  await db.get().collection('clients').findOne({email:userDet.email})
          if(user){
           let match= await bcrypt.compare(userDet.password, user.password)
           if(match){
            console.log('passwor matched')
            console.log("inId",user._id)
                 let id= user._id
            resolve({status:true,id:id})
           }else if(!match){
            console.log('password not matched')
           }
          }else if(!user){
            console.log('no user here')
          }
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
   }

}