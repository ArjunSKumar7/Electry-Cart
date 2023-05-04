const userproductHelpers = require("../../helpers/UserHelpers/userProductHelpers");
const { viewAddCategory } = require("../../helpers/adminHelpers/adminProductHelpers");
const userWhishlistHelpers = require("../../helpers/UserHelpers/userWhishlistHelpers");
const user = require("../../models/connection");
let cartcount,viewCategory,shopproducts,wishcount
module.exports = {



  shopProduct: async(req, res) => {
    cartcount=req.session.count
    req.session.loggedIn=true
    let userSession= req.session.loggedIn
    let catFilter =req.query.catName
    const page=req.query.page||1;
    const perpage =5;
    const count = await user.product.countDocuments({})
      const prodlistcount=count;

    wishcount = await userWhishlistHelpers.getWishCount(req.session.user._id)
    
    if(req.query.catName === undefined){
      viewCategory=await userproductHelpers.viewAddCategory()
    
      userproductHelpers.shopListProduct(catFilter,page,perpage).then((response) => {
        
        res.render("user/shop", { response,userSession,wishcount,cartcount,viewCategory,pages:Math.ceil(prodlistcount/perpage)});
      });
    }else{
      shopproducts=await userproductHelpers.shopListProduct(catFilter)
     
      res.json(shopproducts)
      
    }
  },

  viewProductDetails: async(req, res) => {
    req.session.loggedIn=true
    cartcount=req.session.count
    let userSession= req.session.loggedIn
    wishcount = await userWhishlistHelpers.getWishCount(req.session.user._id)
    userproductHelpers.viewProductDetails(req.params.id).then((response) => {

      
      res.render("user/viewProductDetails", {response,wishcount,userSession,cartcount});
    });
  },




};
