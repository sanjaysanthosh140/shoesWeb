const jwt = require('jsonwebtoken')
const db = require('../config/config.js')
const { ObjectId } = require('mongodb')
module.exports={
    addtoCarts:(userId,cartId)=>{
        let ObjId={
            item: new ObjectId(cartId),
            quantity:1
        }
        let frvCart = null
        return new Promise(async(resolve,reject)=>{
            try {
                jwt.verify(userId,'sanju',async(err,decodedTocken)=>{
                    if(err){
                        console.log(err)

                    }else{
                        console.log('frv',decodedTocken)
                       
                    }
               frvCart  =  await db.get().collection('Carts').findOne({userId: new ObjectId(decodedTocken.id)})
                   
               if(frvCart){
                console.log('user')
                let item =  await  frvCart.products.findIndex(products=>products.item.toString() === cartId)
                        if(item !== -1){
                           await db.get().collection('Carts').updateOne({
                            'userId': new ObjectId(decodedTocken.id),
                            'products.item': new ObjectId(cartId),
                           },{
                            $inc:{
                                'products.$.quantity':1
                            }
                           })
                       }else{
                        await db.get().collection('Carts').updateOne({userId: new ObjectId(decodedTocken.id)},{
                            $push:{
                               products:ObjId
                            }
                        })
                       }
                }else if(!frvCart){
                let FrvCarts={
                    userId: new ObjectId(decodedTocken.id),
                     products: [ObjId] 
                  }
                  await db.get().collection('Carts').insertOne(FrvCarts).then((data)=>{
                    resolve(data)
                    console.log('new userlogined')
                  })
                }

            })
            } catch (error) {
                console.log(error)
                reject(error)
            }
        })
    },

    getFrvCartItems: (userId) => {
        return new Promise(async(resolve,reject)=>{
            try {
                jwt.verify(userId,'sanju',async(err,decodedTocken)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log(decodedTocken.id)
                    }
                  let products =  await db.get().collection('Carts').aggregate([
                        {
                            $match:{
                                userId: new ObjectId(decodedTocken.id)
                               },
                        },
                        {
                            $unwind:"$products"
                        },
                        {
                            $project:{
                                  item:"$products.item",
                                  quantity:"$products.quantity"
                            }
                        },
                        {
                            $lookup:{
                                from:'shoesInfo',
                                localField:'item',
                                foreignField:'_id',
                                as:'products'
                            },
                            
                        },
                        {
                            $project:{
                                quantity:1,_id:1,products:{$arrayElemAt:['$products',0]}
                            }
                        }

                ]).toArray()
                if(products){
                    resolve(products)
                    console.log(products)
                }
                })
            } catch (error) {
                console.log(error)
                reject(error)
            }
        })
    },

    //totalPrice:()=>{
    //    try {
    //        return new Promise(async(resolve,reject)=>{
    //        let totla=  await  db.get().collection('Carts').aggregate([
    //                
    //              ])
    //              if(totla){
    //                console.log(totla)
    //                resolve(totla)
    //              }
    //        })
    //    } catch (error) {
    //        console.log(error)
    //    }
    //}


}