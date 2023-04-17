const userproductHelpers = require("../../helpers/UserHelpers/userProductHelpers");
let cartcount
module.exports = {
  //shop

  shopProduct: (req, res) => {
    cartcount=req.session.count
    req.session.loggedIn=true
    let userSession= req.session.loggedIn
    userproductHelpers.shopListProduct().then((response) => {
      res.render("user/shop", { response,userSession,cartcount });
    });
  },

  viewProductDetails: (req, res) => {
    req.session.loggedIn=true
    cartcount=req.session.count
    let userSession= req.session.loggedIn
    userproductHelpers.viewProductDetails(req.params.id).then((response) => {
      console.log("Response of viewproducts:"+response);

      // console.log("usersession req.session.users._id:"+res.session.user._id);
      
      res.render("user/viewProductDetails", {response,userSession,cartcount});
    });
  },




};
