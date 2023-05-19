const adminOfferHelper = require("../../helpers/adminHelpers/adminOfferHelper");
const adminProductHelpers = require("../../helpers/adminHelpers/adminProductHelpers");

module.exports = {
  productoffer: async (req, res) => {
    adminProductHelpers.getViewProduct().then((response) => {
      res.render("admin/add-productoffer", {
        layout: "adminLayout",
        response,

        adminlogin: true,
      });
    });
  },

  productofferajax: async (req, res) => {
    adminProductHelpers.productofferajax(req.body).then((response) => {
      res.json({ status: true });
    });
  },

  removeofferajax: async (req, res) => {
    try {
      adminOfferHelper.removeofferajax(req.body).then((response) => {
        res.json(response);
      });
    } catch (err) {
      console.log("Error occurred while removing the offer:", err);
    }
  },
};
