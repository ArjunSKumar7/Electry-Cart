const userCheckoutHelper = require("../../helpers/UserHelpers/userCheckoutHelper");
const userCartHelpers = require("../../helpers/UserHelpers/UserCartHelper");
let cartcount,userSession;
module.exports = 
{
  
  getCheckOut: async (req, res) => {

    try {
      // let users = req.session.user.id
  
      req.session.loggedIn = true;
      userSession = req.session.loggedIn;
      let userId=req.session.user._id
      console.log("userId",userId)
      if (req.session.user.finalTotal) {
        total = req.session.user.finalTotal
      }
      else {

        total = await userCartHelpers.totalCheckOutAmount(req.session.user.id)
      }

      // let count = await userCartHelpers.getCartItemsCount(req.session.user.id);
      
      cartcount = req.session.count;
       // console.log("pagecount",count);
      let cartItems = await userCartHelpers.viewCart(req.session.user.id)
      userCheckoutHelper.checkOutpage(req.session.user.id).then((response) => {


        res.render('user/checkout', { userSession, userId, cartItems, total, response,  cartcount })
      })
    } catch (error) {
      res.status(500)
    }


  },




      postAddresspage: async (req, res) => {

        try {
          await userCheckoutHelper.postAddress(req.session.user.id, req.body).then(() => {
            res.redirect("/checkout")
          })
        } catch (error) {
          res.status(500)
        }
    
      },
}