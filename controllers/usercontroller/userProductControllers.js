const userproductHelpers = require("../../helpers/UserHelpers/userProductHelpers");
const { viewAddCategory } = require("../../helpers/adminHelpers/adminProductHelpers");
let cartcount,viewCategory,shopproducts
module.exports = {
  //shop

  shopProduct: async(req, res) => {
    cartcount=req.session.count
    req.session.loggedIn=true
    let userSession= req.session.loggedIn
    let catFilter =req.query.catName
    console.log("catName    : ",catFilter, typeof(req.query.catName));
    if(req.query.catName === undefined){
      viewCategory=await userproductHelpers.viewAddCategory()
      console.log("viewaddcategory console",viewCategory);
      userproductHelpers.shopListProduct().then((response) => {
        console.log("response : ",response,viewCategory);
        res.render("user/shop", { response,userSession,cartcount,viewCategory});
      });
    }else{
      shopproducts=await userproductHelpers.shopListProduct(catFilter)
      console.log("bbbbbbbbbbbbb",shopproducts);
      res.json(shopproducts)
      
    }
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
