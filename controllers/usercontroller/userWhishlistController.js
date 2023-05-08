const userWhishlistHelpers = require("../../helpers/UserHelpers/userWhishlistHelpers");



module.exports={


    getWishlist: async (req, res) => {

        userWhishlistHelpers
          .addToWishList(req.query.wishid, req.session.user._id)
          .then((response) => {
            res.json(response.status);
          });
      },



      listWishList: async (req, res) => {
        let userId=req.session.user._id
        cartcount = req.session.count;
        let wish_count = await userWhishlistHelpers.getWishCount(userId)
        req.session.wishcount=wish_count;
        let wishcount= req.session.wishcount
    
        await userWhishlistHelpers
          .ListWishList(req.session.user._id)
          .then((wishlistItems) => {
       
            res.render("user/whislist", {
              wishlistItems,
              wishcount,
              cartcount,
              userSession:true,
              userId
            });
          });
      },

      deleteWishList: async (req, res) => {
        try {
          await userWhishlistHelpers.getDeleteWishList(req.body).then((response) => {
    
            res.json(response)
    
          })
        } catch (error) {
          res.status(500)
        }
    
      },
}