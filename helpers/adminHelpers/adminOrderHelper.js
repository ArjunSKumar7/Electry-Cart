const { reject } = require("promise");
const user = require("../../models/connection");
const orders = require("../../models/order");

module.exports = {
  orderPage: () => {
    return new Promise(async (resolve, reject) => {
      await orders.order
        .aggregate([
          {
            $unwind: "$orders",
          },
          {
            $sort: { "orders.createdAt": -1 },
          },
        ])
        .then((response) => {
          resolve(response);
        });
    });
  },

  orderDetails: (orderId) => {
    return new Promise(async (resolve, reject) => {
      let order = await orders.order.findOne(
        { "orders._id": orderId },
        { "orders.$": 1 }
      );

      resolve(order);
    });
  },

  changeOrderStatus: (orderId, data) => {
    return new Promise(async (resolve, reject) => {
      let orderss = await orders.order.findOne(
        { "orders._id": orderId },
        { "orders.$": 1 }
      );

      let users = await orders.order.updateOne(
        { "orders._id": orderId },
        {
          $set: {
            "orders.$.orderStatus": data.status,
          },
        }
      );

      let response = {
        message: "Order status updated successfully",
      };

      resolve(response);
    });
  },

  admindashboard: async () => {
    try {
      let response = {};
      let ordercounts = await orders.order.aggregate([
        { $unwind: "$orders" },

        { $match: { "orders.orderStatus": "Delivered" } }

      ])
      let ordercount=ordercounts.length
      let productsCount = await user.product.countDocuments({});
      let catagoryCount = await user.category.countDocuments({});

      let revenue = await orders.order
        .aggregate([
          { $unwind: "$orders" },

          { $match: { "orders.orderStatus": "Delivered" } },

          {
            $group: {
              _id: null,
              totalRevenue: {
                $sum: "$orders.totalPrice",
              },
            },
          },
        ])
        
      let monthlyEarnings = await orders.order
        .aggregate([
          { $unwind: "$orders" },

          { $match: { "orders.orderStatus": "Delivered" } },

          {
            $match: {
              "orders.createdAt": {
                $gte: new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  1
                ),
              },
            },
          },

          { $group: { _id: null, totalPrice: { $sum: "$orders.totalPrice" } } },
        ])
        
      let paymentcounts = await orders.order
        .aggregate([
          { $unwind: "$orders" },
          { $match: { "orders.orderStatus": "Delivered" } },
          {
            $match: {
              "orders.paymentmode": { $in: ["COD", "online"] },
            },
          },

          {
            $group: {
              _id: "$orders.paymentmode",
              count: { $sum: 1 },
            },
          },
        ])
       

        let monthlySales = await orders.order.aggregate([
          { $unwind: "$orders" },
          { $match: { "orders.orderStatus": "Delivered" } },
         
          {
            $addFields: {
              month: { $month: "$orders.createdAt" }, // add a new field "month" with the month of the order's creation date
            },
          },
          {
            $group: {
              _id: "$month", // group by month
              totalSales: { $sum: 1 }, // sum up the total sales for each month
            },
          },
          {
            $sort: { _id: 1 }, // sort by month in ascending order
          },
        ]) 
         // converting data for graph from aggregate function
      let dataForGraph_Sales = [];
      for (let i = 1; i <= 12; i++) {
        const month = getMonthName(i);
        const sales=
          monthlySales.find((sale) => sale._id === i) || { totalSales: 0 };
        const value = sales.totalSales;
        dataForGraph_Sales.push({ month, value });
      }

      function getMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1);
        return date.toLocaleString("default", { month: "long" });
      }

      response.ordercount = ordercount==null ? 0 : ordercount;
      response.productsCount = productsCount==null ? 0 : productsCount;
      response.catagoryCount = catagoryCount==null ? 0 : catagoryCount;
      response.revenue = !revenue[0]?.totalRevenue ? 0 : revenue[0].totalRevenue;
      response.dataForGraph_Sales = dataForGraph_Sales==null ? 0 : dataForGraph_Sales;
      response.paymentcounts = paymentcounts==null ? 0 : paymentcounts;
      response.monthlyEarnings = monthlyEarnings?.pop();

        


return response;
    } catch(error) {
      console.log("cannot fetch details for dashboard");
    }
  },
};
