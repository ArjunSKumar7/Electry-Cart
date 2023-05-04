const adminOrderHelper=require("../../helpers/adminHelpers/adminOrderHelper")


module.exports={

    getOrderList: (req, res) => {


        adminOrderHelper.orderPage().then((response) => {
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
    
          res.render('admin/order-list', { layout: 'adminLayout', adminlogin:true, response, getDate })
        })
      },


      getOrderDetails: (req, res) => {
        adminOrderHelper.orderDetails(req.query.orderid).then((order) => {
       
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
    
          let products = order.orders[0].productDetails
          let total = order.orders
          res.render('admin/order-details', { layout: 'adminLayout', adminlogin:true, order, products, total, getDate })
        })
    
      },


      postOrderDetails: (req, res) => {
        adminOrderHelper.changeOrderStatus(req.query.orderId, req.body).then((response) => {
          res.redirect('/admin/orders_list')
        })
    
      },






}