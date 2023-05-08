const userCheckoutHelper = require("../../helpers/UserHelpers/userCheckoutHelper");
const userCartHelpers = require("../../helpers/UserHelpers/UserCartHelper");
const userOrderHelpers = require("../../helpers/UserHelpers/userOrderHelper");
const userCouponHelpers = require("../../helpers/UserHelpers/userCouponHelper");
const userWhishlistHelpers = require("../../helpers/UserHelpers/userWhishlistHelpers");
const userPaymemtHelpers = require("../../helpers/UserHelpers/userPaymemtHelper");

let cartcount, userSession, wishcount;
module.exports = {
  getCheckOut: async (req, res) => {
    try {
      // let users = req.session.user.id

      req.session.loggedIn = true;
      userSession = req.session.loggedIn;
      let userId = req.session.user._id;

      let total = await userCartHelpers.totalCheckOutAmount(
        req.session.user._id
      );



      cartcount = req.session.count;

      let cartItems = await userCartHelpers.viewCart(req.session.user._id);
      wishcount = await userWhishlistHelpers.getWishCount(req.session.user._id);
      userCheckoutHelper.checkOutpage(req.session.user._id).then((response) => {
        res.render("user/checkout", {
          userSession,
          userId,
          cartItems,
          wishcount,

          total,
          response,
          cartcount,
        });
      });
    } catch (error) {
      res.status(500);
    }
  },

  postAddresspage: async (req, res) => {
    try {
      await userCheckoutHelper
        .postAddress(req.session.user._id, req.body)
        .then(() => {
          res.redirect("/checkout");
        });
    } catch (error) {
      res.status(500);
    }
  },

  postcheckout: async (req, res) => {
    const postchecksubtotal = parseInt(req.body.postchecksubtotal);
    const postchecktotal = parseInt(req.body.postchecktotal);
    const couponCode = req.body.couponCode;
    let userId = req.session.user._id;

    // if (req.body.couponCode) {

    //  await userCouponHelpers.addCouponIntUseroDb(couponData, userId)
    // }
    
    let order = await userOrderHelpers
      .placeOrder(req.body, postchecksubtotal, postchecktotal, userId)
      .then(async (response) => {

        if (req.body["payment-method"] == "COD") {
          res.json({ codstatus: true });
        } else if (req.body["payment-method"] == "online") {
          userPaymemtHelpers
            .generateRazorpay(req.session.user._id, postchecktotal)
            .then((order) => {
              res.json(order);
            });
        }

      });
      
  },
};
