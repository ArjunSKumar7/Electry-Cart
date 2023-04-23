const userCartHelpers = require("../../helpers/UserHelpers/UserCartHelper");

let cartcount,userId;

module.exports = {

  addtocart: (req, res) => {
    try {
      req.session.loggedIn = true;
      let userSession = req.session.loggedIn;
  userId =req.session.user._id
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
    let total = await userCartHelpers.totalCheckOutAmount(req.session.user._id);
    let cartItems = await userCartHelpers.viewCart(req.session.user._id);
console.log("cart items",cartItems  );

    req.session.count = cartItems.length;

    cartcount = req.session.count;

    userId = req.session.user._id;
    console.log("userid",userId);
    res.render("user/view-cart", {
      cartItems,
      userId,
      total,
      userSession: true,
      cartcount,
    });
  },


  // postCart:



  postchangeProductQuantity: async (req, res) => {
    try {
      
      await userCartHelpers.changeProductQuantity(req.body).then(async (response) => {
        response.total = await userCartHelpers.totalCheckOutAmount(req.body.user);
      // console.log("Tttt",response)
        res.json(response);
      });
    } catch (error) {
      res.status(500)
    }
  },

  getDeleteCart: async (req, res) => {
    try {
      
      await userCartHelpers.deleteCart(req.body).then((response) => {
        res.json(response);
      });
    } catch (error) {
      res.status(500)
    }
  },

  

  postCart:(req,res)=>{
   
      res.redirect("/checkout")
  
  },





};
