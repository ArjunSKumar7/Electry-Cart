var express = require("express");
const userCartController = require("../controllers/usercontroller/userCartController");
var router = express.Router();
const controllers=require('../controllers/usercontroller/usercontroller')
const userProductController=require('../controllers/usercontroller/userProductControllers')
const userCheckoutController=require('../controllers/usercontroller/userCheckoutController')
const userCouponController=require('../controllers/usercontroller/userCouponController')
const userOrderController=require('../controllers/usercontroller/userOrderController')
const userWhislistController=require('../controllers/usercontroller/userWhishlistController')
const userPaymentController=require('../controllers/usercontroller/userPaymentController')

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





/*whishlist routes */

router.get("/add_to_wishlist", auths.userauth,userWhislistController.getWishlist);

router.get('/view_wishlist',auths.userauth,userWhislistController.listWishList);

router.delete('/delete_wishlist',auths.userauth,userWhislistController.deleteWishList)



/*whishlist routes ends */




/*cart routes */

router.get("/add-to-cart/:id",auths.userauth,userCartController.addtocart)

router.get("/viewcart",auths.userauth,userCartController.getViewCart)

router.post('/view_cart', auths.userauth,userCartController.postCart)

router.put("/change-product-quantity", auths.userauth,userCartController.postchangeProductQuantity)

router.delete("/delete_cart_item", auths.userauth,userCartController.getDeleteCart);



/*cart routes ends*/




router.post('/validate_coupon', auths.userauth,userCouponController.validateCoupon)

/*checkout routes*/
router.get("/checkout", auths.userauth,userCheckoutController.getCheckOut)

router.post('/add_address',auths.userauth,userCheckoutController.postAddresspage)

router.post('/checkout',auths.userauth,userCheckoutController.postcheckout)

/*checkout routes ends*/

/*order routes*/

router.get('/orders',auths.userauth,userOrderController.getOrderPage)

router.get('/quick_details',auths.userauth,userOrderController.getquickdetails)


router.get('/order_details', auths.userauth,userOrderController.orderDetails)

router.put('/cancel_order',auths.userauth,userOrderController.getCancelOrder)

router.put('/return_order', auths.userauth,userOrderController.getReturnOrder)


/*order routes end*/


router.post('/verify_payment', auths.userauth,userPaymentController.postVerifyPayment)




router.get('/order_success', auths.userauth,userOrderController.getSuccessPage)

module.exports = router; 



