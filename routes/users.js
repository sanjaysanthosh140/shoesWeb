var express = require('express');
var router = express.Router();
const userMeth = require('../userHelpers/usermethods.js')
const jwt = require('jsonwebtoken')
const verifyAuth = require('../middleware/verifyUser.js')
const addtoCart = require("../userHelpers/userFrvcrt.js")
const ordersplace = require('../placedOrder/placeOrder.js')
/* GET users listing. */
let maxAge = 3 * 24 * 60 * 60

function tockens(id) {
  console.log('id in fun', id)
  return jwt.sign({ id }, 'sanju', {
    expiresIn: maxAge
  })
}
router.get('/', function (req, res, next) {
  res.render('users/home');
});

router.get('/products', verifyAuth, (req, res) => {
  try {
    // const userEncod=req.cookies.encode
    //  verifyRouts.verifyUsers(userEncod)
    userMeth.displayprod().then((data) => {
      if (data) {
        console.log(data)
        res.render('users/products', { data })
      }
    })
  } catch (error) {

    console.log(error)
  }
})

router.get('/servces', (req, res) => {
  try {
    res.send('services')
  } catch (error) {
    console.log(error)
  }
})


router.get('/signUp', (req, res) => {
  try {
    res.render('users/signUp')
  } catch (error) {
    console.log(error)
  }
})


router.post('/signup', (req, res) => {
  try {
    console.log(req.body)
    let userdata = req.body
    userMeth.usersIn(userdata).then((data) => {
      console.log('Id:', data)
      let Encode = tockens(data)
      console.log('return val', Encode)
      res.cookie('encode', Encode, {
        maxAge: maxAge * 1000,
        httpOnly: true
      })
      if (data) {
        res.redirect('/products')
      }
    })
    console.log(userdata.password)

  } catch (error) {
    console.log(error)
  }
})

router.get('/logme', (req, res) => {
  try {
    res.render('users/login')
  } catch (error) {
    console.log(error)
  }
})

router.post('/Login', (req, res) => {

  try {
    function direct() {
      res.redirect('/')
    }
    const userData = req.body
    userMeth.userLog(userData).then((result) => {
      console.log('result', result)
      if (result.id) {
        const Id = result.id
        let Encode = tockens(Id)
        res.cookie('encode', Encode, {
          maxAge: maxAge * 1000,
          httpOnly: true

        })
        direct()
      }

    })

  } catch (error) {
    console.log(error)
  }
})




router.get('/buy/:id', (req, res) => {
  try {
    const cartId = req.params.id
    const userId = req.cookies.encode
    console.log('frvCart', cartId, userId)
    addtoCart.addtoCarts(userId, cartId).then((data)=>{
      console.log(data)
    })
    addtoCart.getFrvCartItems(userId).then((result)=>{
      console.log('resut',result)
      if(result){
        res.render('users/frvCarts',{result})
      }
    })

  } catch (error) {
    console.log(error)
  }
})

router.get('/placeOrde',async(req,res)=>{
  try {
      res.render('users/placeOrdes')
  } catch (error) {
    console.log(error)
  }
})



router.post('/placeOrder',(req,res)=>{
  let userId = req.cookies.encode
  try {
    console.log("bodydata",req.body)
    let cartItems = addtoCart.getFrvCartItems(userId)
    //let otalPrice = addtoCart.totalPrice()
    ordersplace.ordering(req.body,cartItems).then((data)=>{
      console.log(data)
      ordersplace.razorMethos(data).then((data)=>{
        console.log(data)
        if(data){
          if(req.body.paymentMethod==='cod'){
            res.json({status:true})
          }else{
            res.json({status:false,data})
          }
        }

      })
    })
  } catch (error) {
    console.log(error)
  }
})

router.post('/verifypay',(req,res)=>{
  try {
    console.log('verify',req.body)
    res.json({status:true})
  } catch (error) {
    console.log(error)
  }
})

router.get('/successfully',(req,res)=>{
  try {
    res.render('users/successfully')
  } catch (error) {
    console.log(error)
  }
})
module.exports = router;
