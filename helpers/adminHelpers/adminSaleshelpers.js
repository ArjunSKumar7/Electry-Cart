const user =require("../../models/connection");
const orderSchema=require("../../models/order")

module.exports={

    getSalesReport: () => {
        return new Promise(async (resolve, reject) => {
          let response = await orderSchema.order.aggregate([
            {
              $unwind: "$orders"
            },
            {
              $match: {
                "orders.orderStatus": "Delivered"
              }
            },
          ])
          resolve(response)
        })
      },



      gettotalamount: () => {
        return new Promise(async (resolve, reject) => {
    
    
          await orderSchema.order.aggregate([
    
            {
              $unwind: '$orders'
            },
            {
              $match: {
                "orders.orderStatus": "Delivered"
              }
            },
            {
              $project: {
                productDetails: '$orders.productDetails',
    
              }
    
            },
            {
              $unwind: '$productDetails'
            },
    
            {
              $project: {
                price: '$productDetails.productsPrice',
                quantity: '$productDetails.quantity'
              }
            },
    
    
            // {
            //   $lookup: {
            //     from: 'products',
            //     localField: "item",
            //     foreignField: "_id",
            //     as: 'carted'
            //   }
            // },
            // {
            //   $project: {
            //     item: 1, quantity: 1, product: { $arrayElemAt: ['$carted', 0] }
            //   }
    
            // },
            {
              $group: {
                _id: null,
                total: { $sum: { $multiply: ["$price", "$quantity"] } }
              }
            }
          ]).then((total) => {
    
    
            resolve(total[0]?.total)
    
    
          })
    
        })
    
      },


      getTotalAmount: (date) => {
        let start = new Date(date.startdate);
        let end = new Date(date.enddate);
        return new Promise(async (resolve, reject) => {
    
    
          await orderSchema.order.aggregate([
    
            {
              $unwind: '$orders'
            },
            {
              $match: {
                $and: [
                  { "orders.orderStatus": "Delivered" },
                  { "orders.createdAt": { $gte: start, $lte: end } }
    
                ]
              }
            },
            {
              $project: {
                productDetails: '$orders.productDetails',
    
              }
    
            },
            {
              $unwind: '$productDetails'
            },
    
            {
              $project: {
                price: '$productDetails.productsPrice',
                quantity: '$productDetails.quantity'
              }
            },
    
    
            // {
            //   $lookup: {
            //     from: 'products',
            //     localField: "item",
            //     foreignField: "_id",
            //     as: 'carted'
            //   }
            // },
            // {
            //   $project: {
            //     item: 1, quantity: 1, product: { $arrayElemAt: ['$carted', 0] }
            //   }
    
            // },
            {
              $group: {
                _id: 0,
                total: { $sum: { $multiply: ["$price", "$quantity"] } }
              }
            }
          ]).then((total) => {
    
    
            resolve(total[0]?.total)
            // console.log(total[0].total[0], '------------------------------');
    
    
          })
    
        })
    
      },
      postReport: (date) => {
        let start = new Date(date.startdate);
        let end = new Date(date.enddate);
    
        return new Promise(async (resolve, reject) => {
          await orderSchema.order.aggregate([
            {
              $unwind: "$orders",
            },
            {
              $match: {
                $and: [
                  { "orders.orderStatus": "Delivered" },
                  { "orders.createdAt": { $gte: start, $lte: end } }
    
                ]
              }
            }
          ])
            .exec()
            .then((response) => {
              console.log(response);
              resolve(response)
            })
        })
    
      },


}