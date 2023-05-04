const userCartHelpers = require("../../helpers/UserHelpers/UserCartHelper");
const userCouponHelpers=require("../../helpers/UserHelpers/userCouponHelper")
const userOrderHelpers=require("../../helpers/UserHelpers/userOrderHelper")
const userWhishlistHelpers=require("../../helpers/UserHelpers/userWhishlistHelpers")


let latestorder;
module.exports={
   
   
    getOrderPage: async (req, res) => {

        try {
            let userId=req.session.user._id
            cartcount = req.session.count;
            
            wishcount = await userWhishlistHelpers.getWishCount(req.session.user._id)
          const getDate = (date) => {
            let orderDate = new Date(date);
            let day = orderDate.getDate();
            let month = orderDate.getMonth() + 1;
            let year = orderDate.getFullYear();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();
            return `${isNaN(day) ? "00" : day}-${isNaN(month) ? "00" : month}-${isNaN(year) ? "0000" : year
              } ${date.getHours(hours)}:${date.getMinutes(minutes)}:${date.getSeconds(seconds)}`;
          };
          await userOrderHelpers.orderPage(req.session.user._id).then((response) => {
    
    
           
    
            res.render('user/orderslist', { response, userSession:true, userId, wishcount, cartcount, getDate })
          })
        } catch (error) {
          res.status(500)
        }
    
    
      },
      

      orderDetails: async (req, res) => {
    
        try {
            let userId=req.session.user._id
            cartcount = req.session.count;
            
            wishcount = await userWhishlistHelpers.getWishCount(req.session.user._id)
          let orderId = req.query.order
         
          getDate = (date) => {
            let orderDate = new Date(date);
            let day = orderDate.getDate();
            let month = orderDate.getMonth() + 1;
            let year = orderDate.getFullYear();
    
            return `${isNaN(day) ? "00" : day}-${isNaN(month) ? "00" : month}-${isNaN(year) ? "0000" : year
              }`;
          };
    
          await userOrderHelpers.viewOrderDetails(orderId).then(async (response) => {
           
            let products = response.products[0]
            let address = response.address[0]
           
            let orderDetails = response.details
            let data = userOrderHelpers.createData(response, getDate)
            // console.log("data",data)
    
            res.render('user/orderdetails', { products, address, orderDetails, userSession:true, userId, wishcount, cartcount, getDate, data })
    
          })
        } catch (error) {
          res.status(500)
        }
    
    
    
      },




      getCancelOrder: async (req, res) => {

        try {
          await userOrderHelpers.cancelOrder(req.query.orderid, req.session.user._id).then((response) => {
            res.json(response)
          })
        } catch (error) {
          res.status(500)
        }
    
      },

      getReturnOrder: async (req, res) => {

        try {
          await userOrderHelpers.returnOrder(req.query.orderid, req.session.user._id).then((response) => {
            res.json(response)
          })
    
        } catch (error) {
          res.status(500)
        }
      },
    






      getSuccessPage: (req, res) => {
        res.render('user/success')
      },



}