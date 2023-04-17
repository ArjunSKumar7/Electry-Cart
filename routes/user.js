var express = require("express");
const userCartController = require("../controllers/usercontroller/userCartController");
var router = express.Router();
const controllers=require('../controllers/usercontroller/usercontroller')
const userProductController=require('../controllers/usercontroller/userProductControllers')
// const userBannerContoller=require('../controllers/usercontroller/userBannerController')
const auths=require('../middlewares/middleware')

/* login */
router.get("/",auths.userauth,controllers.getHome)
  
router.get("/login",auths.userauth, controllers.getUserLogin)

router.post("/login", controllers.postUserLogin )

router.get("/signup",controllers.getSignUp)

router.post("/signup", controllers.postSignUp)

router.get("/getotp",controllers.getotp)

router.post("/postotp",controllers.postotp)

router.get("/verifyotp",controllers.getverifyotp)

router.post('/verifyOtp',controllers.postverifyotp);

router.get("/reset_password",auths.userauth,controllers.getPasswordReset)

router.get("/logout",controllers.logOut);




/*product routes*/

router.get("/shop",auths.userauth,userProductController.shopProduct)

router.get("/viewProductDetails/:id",auths.userauth,userProductController.viewProductDetails)


/*cart routes*/
router.get("/add-to-cart/:id",auths.userauth,userCartController.addtocart)

router.get("/viewcart",auths.userauth,userCartController.getViewCart)

// router.put("/change_product_quantity", auths.userauth,userCartController.postchangeProductQuantity);







module.exports = router; 



