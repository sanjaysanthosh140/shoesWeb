const db = require('../config/config.js')
const Razorpay = require('razorpay')

var instance = new Razorpay({
   key_id: 'rzp_test_j7B2kLPTq9IObD',
   key_secret: 'Sqkmw7Tg6slcetKToGxNGMkN',
  });
module.exports ={

    ordering :(order,products)=>{
        try {
            let status = order.paymentMethod === 'cod'?'placed':'pending'
         let  orderId={
                name:order.name,
                detals:order.address,
                phone:order.phone,
                paymentMethod:order.paymentMethod,
                prodDet:{
                    productname:products. proname,
                    productPrice:products.proPrice,
                    status:status,
                    
                }
            
            }
            return new Promise((resolve,reject)=>{
                db.get().collection('orders').insertOne(orderId).then((data)=>{
                    console.log(data.insertedId)
                     resolve(data.insertedId)
                })
            })
        } catch (error) {
            console.log(error)
           
        }
    },

    razorMethos :(id)=>{
        try {
            return new Promise((resolve,reject)=>{
                    var options={
                    amount: 50000,
                    currency: "INR",
                    receipt: ""+id,
                    }
        instance.orders.create(options,function(err,order){
                if(err){
                    console.log(err)
                }else{
                    console.log(order)
                    resolve({order})
                }
        })
                
            })
        } catch (error) {
            console.log(error)
        }
    }

}