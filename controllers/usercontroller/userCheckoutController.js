const userCheckoutHelper = require("../../helpers/UserHelpers/userCheckoutHelper");


module.exports = 
{
    getCheckOut: async (req, res) => {
        try {
          
        res.render("user/checkout")
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