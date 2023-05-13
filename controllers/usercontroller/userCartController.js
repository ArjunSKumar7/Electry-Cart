const userCartHelpers = require("../../helpers/UserHelpers/UserCartHelper");
const userCouponHelpers = require("../../helpers/UserHelpers/userCouponHelper");
const userWhishlistHelpers = require("../../helpers/UserHelpers/userWhishlistHelpers");

let cartcount, userId, wishcount;

module.exports = {
  addtocart: (req, res) => {
    try {
      req.session.loggedIn = true;
      let userSession = req.session.loggedIn;
      userId = req.session.user._id;
      userCartHelpers

        .addtocart(req.params.id, req.session.user._id)
        .then((response) => {
          req.session.count += 1;
          // res.redirect("back")
          res.json(response);
        });
    } catch (error) {
      res.status(500);
    }
  },

  getViewCart: async (req, res) => {
    let total = await userCartHelpers.totalCheckOutAmount(req.session.user._id);
    wishcount = await userWhishlistHelpers.getWishCount(req.session.user._id);
    let cartItems = await userCartHelpers.viewCart(req.session.user._id);

    req.session.count = cartItems.length;

    cartcount = req.session.count;

    userId = req.session.user._id;
    res.render("user/view-cart", {
      cartItems,
      userId,
      total,
      wishcount,
      userSession: true,
      cartcount,
    });
  },

  // postCart:

  postchangeProductQuantity: async (req, res) => {
    try {
      await userCartHelpers
        .changeProductQuantity(req.body)
        .then(async (response) => {
          response.total = await userCartHelpers.totalCheckOutAmount(
            req.body.user
          );
          res.json(response);
        });
    } catch (error) {
      res.status(500);
    }
  },

  getDeleteCart: async (req, res) => {
    try {
      await userCartHelpers.deleteCart(req.body).then((response) => {
        res.json(response);
      });
    } catch (error) {
      res.status(500);
    }
  },

  postCart: async (req, res) => {
    const couponData = req.body;

    couponName = req.body.couponName;
    couponTotal = req.body.total;
    discountAmount = req.body.discountAmount;
    if (couponData.couponName) {
      //**********userhelpers************** */
      await userCouponHelpers
        .addCouponIntUseroDb(couponData, req.session.user._id)
        .then((response) => {
          res.redirect("/checkout");
        });
    } else {
      res.redirect("/checkout");
    }
  },
};
