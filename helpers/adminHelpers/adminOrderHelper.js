const user =require("../../models/connection");
const orders=require("../../models/order")

  module.exports={

    orderPage: () => {
        return new Promise(async (resolve, reject) => {
    
          await orders.order.aggregate([
            {
              $unwind: '$orders'
            },
            {
              $sort: { 'orders: createdAt': -1 }
            }
          ]).then((response) => {
            resolve(response)
    
          })
        })
    
      },


      orderDetails: (orderId) => {
        return new Promise(async (resolve, reject) => {
    
          let order = await orders.order.findOne({ 'orders._id': orderId }, { 'orders.$': 1 })
         
          resolve(order)
        })
    
      },


      changeOrderStatus: (orderId, data) => {
        return new Promise(async (resolve, reject) => {
          let orderss = await orders.order.findOne({ 'orders._id': orderId }, { 'orders.$': 1 })
      
          let users = await orders.order.updateOne(
            { 'orders._id': orderId },
            {
              $set: {
                'orders.$.orderStatus': data.status,
              }
            }
          )
          
          let response = {
            message: 'Order status updated successfully'
          }
          
          resolve(response)
        })
      },


      



}