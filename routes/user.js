var express = require("express");
const userCartController = require("../controllers/usercontroller/userCartController");
var router = express.Router();
const controllers=require('../controllers/usercontroller/usercontroller')
const userProductController=require('../controllers/usercontroller/userProductControllers')
// const userBannerContoller=require('../controllers/usercontroller/userBannerController')
const userCheckoutController=require('../controllers/usercontroller/userCheckoutController')
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

router.get("/profile", auths.userauth, controllers.getProfile);

// router.get("/reset_password",auths.userauth,controllers.getPasswordReset)

router.get("/logout",controllers.logOut);




/*product routes*/

router.get("/shop",auths.userauth,userProductController.shopProduct)

router.get("/viewProductDetails/:id",auths.userauth,userProductController.viewProductDetails)

/*product routes ends*/



/*cart routes */

router.get("/add-to-cart/:id",auths.userauth,userCartController.addtocart)

router.get("/viewcart",auths.userauth,userCartController.getViewCart)

router.post('/view_cart', auths.userauth,userCartController.postCart)

router.put("/change-product-quantity", auths.userauth,userCartController.postchangeProductQuantity)

router.delete("/delete_cart_item", auths.userauth,userCartController.getDeleteCart);



/*cart routes ends*/

/*checkout routes ends*/
router.get("/checkout", auths.userauth,userCheckoutController.getCheckOut)

router.post('/add_address',auths.userauth,userCheckoutController.postAddresspage)










module.exports = router; 



