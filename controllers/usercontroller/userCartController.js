const userCartHelpers = require("../../helpers/UserHelpers/UserCartHelper");

let cartcount;

module.exports = {
  addtocart: (req, res) => {
    try {
      req.session.loggedIn = true;
      let userSession = req.session.loggedIn;

      userCartHelpers
        .addtocart(req.params.id, req.session.user._id)
        .then((response) => {
          req.session.count+=1
          // res.redirect("back")
          res.json(response );
        });
    } catch (error) {
      res.status(500);
    }
  },
  getViewCart: async (req, res) => {
    let cartItems = await userCartHelpers.viewCart(req.session.user._id);
console.log("aaaaaaa",cartItems);
    req.session.count = cartItems.length;

    cartcount = req.session.count;

    let userId = req.session.user._id;
    res.render("user/view-cart", {
      cartItems,
      userId,
      userSession: true,
      cartcount,
    });
  },

  postchangeProductQuantity: async (req, res) => {
    try {
      await userCartHelpers.changeProductQuantity(req.body).then(async (response) => {
        // response.total = await cartHelper.totalCheckOutAmount(req.body.user);

        res.json(response);
      });
    } catch (error) {
      res.status(500)
    }
  },
};
