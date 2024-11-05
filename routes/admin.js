var express = require('express');
var router = express.Router();
const adminMehod = require('../adminHelpers/adminMethods.js')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/adminPanel');
});

router.get('/addpro',(req,res)=>{
  try {
    console.log('reach call')
    res.render('admin/addprod')
  } catch (error) {
   console.log(error) 
  }
})

router.post('/addprod',(req,res)=>{
  try {
    const images  = req.files.productImage
    const proname =  req.body.productName
   let proData={
      proname : req.body.productName,
       proPrice : req.body.productPrice
    }
    
    if(images && proname){
      console.log(images)
      console.log(proname)
      adminMehod.storeProducts(proData).then((id)=>{
        images.mv('./public/proImg/' + id +'.jpg',(err)=>{
          if(err){
            console.log(err)
          }  
        })
      })
      res.render('admin/addprod')
    }  
    
  } catch (error) {
    console.log(error)
  }
})
module.exports = router;


