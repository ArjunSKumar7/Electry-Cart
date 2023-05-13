const userCartHelpers = require("../../helpers/UserHelpers/UserCartHelper");
const userCouponHelpers = require("../../helpers/UserHelpers/userCouponHelper");

module.exports = {
  validateCoupon: async (req, res) => {
    let userId = req.session.user._id;

    let code = req.body.couponname;
    let total = await userCartHelpers.totalCheckOutAmount(userId);
    userCouponHelpers.couponValidator(code, userId, total).then((response) => {
      res.json(response);
    });
  },
};
