const user = require("../../models/connection");
const orderschema = require("../../models/order");
const ObjectId = require("mongodb").ObjectId;
const userCartHelpers = require("../../helpers/UserHelpers/UserCartHelper");

module.exports = {
  placeOrder: (orderData, subtotal, total, userId) => {
    return new Promise(async (resolve, reject) => {
      let productdetails = await user.cart.aggregate([
        {
          $match: {
            user: ObjectId(orderData.userId),
          },
        },
        {
          $unwind: "$cartItems",
        },

        {
          $project: {
            item: "$cartItems.productId",
            quantity: "$cartItems.Quantity",
          },
        },

        {
          $lookup: {
            from: "products",
            localField: "item",
            foreignField: "_id",
            as: "productdetails",
          },
        },
        {
          $unwind: "$productdetails",
        },
        {
          $project: {
            image: "$productdetails.Image",
            category: "$productdetails.category",
            _id: "$productdetails._id",
            quantity: 1,
            productsName: "$productdetails.Productname",
            productsPrice: "$productdetails.Price",
          },
        },
      ]);

      let Address = await user.address.aggregate([
        { $match: { userid: ObjectId(orderData.userId) } },

        { $unwind: "$Address" },

        { $match: { "Address._id": ObjectId(orderData.address) } },

        { $unwind: "$Address" },

        {
          $project: {
            item: "$Address",
          },
        },
      ]);

      const items = Address.map((obj) => obj.item);

      let orderaddress = items;

      let status = orderData["payment-method"] === "COD" ? "Paid" : "Pending";
      let orderStatus =
        orderData["payment-method"] === "COD" ? "Success" : "Pending";

      let orderdata = {
        _id: new ObjectId(),
        name: orderaddress[0].fname,
        paymentStatus: status,
        paymentmode: orderData["payment-method"],
        productDetails: productdetails,
        orderStatus: orderStatus,
        shippingAddress: orderaddress,
        totalPrice: total,
      };
      let orderId = orderdata._id;
      let order = await orderschema.order.findOne({ userid: orderData.userId });

      if (order) {
        await orderschema.order
          .updateOne(
            { userid: orderData.userId },
            {
              $push: {
                orders: orderdata,
              },
            }
          )
          .then((productdetails) => {
            resolve(productdetails);
          });
      } else {
        let newOrder = orderschema.order({
          userid: orderData.userId,
          orders: orderdata,
          
        });

        await newOrder.save().then((orders) => {
          resolve(orders);
        });
      }

      for (let i = 0; i < productdetails.length; i++) {
        let product = productdetails[i];
        let productId = product._id;
        let orderedQuantity = product.quantity;
        await user.product.findOneAndUpdate(
          { _id: productId },
          { $inc: { Quantity: -orderedQuantity } }
        );
      }
      await user.cart
        .updateOne({ user: orderData.userId }, { $set: { cartItems: [] } })
        .then(() => {
          resolve();
        });
    });
  },

  orderdetails: (userId) => {
    return new Promise(async (resolve, reject) => {
      await orderschema.order
        .aggregate([
          {
            $match: { userid: ObjectId(userId) },
          },
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

  orderPage: (userId) => {
    return new Promise(async (resolve, reject) => {
      await orderschema.order
        .aggregate([
          {
            $match: { userid: ObjectId(userId) },
          },
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

  viewOrderDetails: (orderId) => {
    return new Promise(async (resolve, reject) => {
      let productid = await orderschema.order.findOne(
        { "orders._id": orderId },
        { "orders.$": 1 }
      );

      let details = productid.orders[0];
      let order = productid.orders[0].productDetails;

      const productDetails = productid.orders.map(
        (object) => object.productDetails
      );
      const address = productid.orders.map((object) => object.shippingAddress);
      const products = productDetails.map((object) => object);

      resolve({ products, address, details });
    });
  },

  createData: (details, dates) => {
    let address = details.address[0][0];
    console.log("createData", address);
    let product = details.products[0][0];
    let orderDetails = details.details.createdAt;

    console.log("createDataorderdetails", orderDetails);
    let myDate = dates(orderDetails);

    let data = {
      // Customize enables you to provide your own templates
      // Please review the documentation for instructions and examples
      customize: {
        //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html
      },
      images: {
        // The logo on top of your invoice
        logo: "https://res.cloudinary.com/dzgqefrmc/image/upload/v1682932728/image_2023-05-01_144745334_vysero.png",
        // The invoice background
      },
      // Your own data
      sender: {
        company: "Electrify Cart",
        address: "Bournivilla tower",
        zip: "4567 CD",
        city: "Los santos",
        country: "America",
      },
      // Your recipient
      client: {
        company: address.fname,
        address: address.street,
        zip: address.pincode,
        city: address.city,
        country: "India",
      },

      information: {
        number: address.mobile,
        date: myDate,
        "due-date": myDate,
      },

      products: [
        {
          quantity: product.quantity,
          description: product.productsName,
          "tax-rate": 0,
          price: product.productsPrice,
        },
      ],
      // The message you would like to display on the bottom of your invoice
      "bottom-notice": "Thank you for your order from ELECTRIFY CART",
      // Settings to customize your invoice
      settings: {
        currency: "INR", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
      },
    };

    return data;
  },

  cancelOrder: (orderId, userId) => {
    return new Promise(async (resolve, reject) => {
      let orders = await orderschema.order.find({ "orders._id": orderId });
      let orderIndex = orders[0].orders.findIndex(
        (orders) => orders._id == orderId
      );
      await orderschema.order
        .updateOne(
          { "orders._id": orderId },
          {
            $set: {
              ["orders." + orderIndex + ".orderStatus"]: "Cancelled",
            },
          }
        )
        .then(async (orders) => {
          // console.log(orders, 'dfddddddddddddddd');

          resolve(orders);
          let cancelledItems = await orderschema.order.aggregate([
            {
              $unwind: "$orders",
            },
            {
              $match: {
                "orders._id": ObjectId(orderId),
              },
            },
            {
              $match: {
                "orders.orderStatus": "Cancelled",
              },
            },
            {
              $unwind: "$orders.productDetails",
            },
            {
              $project: {
                _id: 0,
                productDetails: "$orders.productDetails",
              },
            },
          ]);
          // after cancellation incermenting product quantity

          for (let i = 0; i < cancelledItems.length; i++) {
            if (cancelledItems[i].productDetails.quantity !== 0) {
              // Check if quantity is defined
              let response = await user.product.updateOne(
                {
                  _id: cancelledItems[i].productDetails._id,
                },
                {
                  $inc: {
                    Quantity: cancelledItems[i].productDetails.quantity,
                  },
                }
              );
            }
          }
        });
    });
  },

  returnOrder: (orderId, userId) => {
    return new Promise(async (resolve, reject) => {
      let orders = await orderschema.order.find({ "orders._id": orderId });

      let orderIndex = orders[0].orders.findIndex(
        (orders) => orders._id == orderId
      );

      await orderschema.order
        .updateOne(
          { "orders._id": orderId },
          {
            $set: {
              ["orders." + orderIndex + ".orderStatus"]: "returned",
            },
          }
        )
        .then(async (orders) => {
          resolve(orders);
          let returnedItems = await orderschema.order.aggregate([
            {
              $unwind: "$orders",
            },
            {
              $match: {
                "orders.OrderStatus": "returned",
              },
            },
            {
              $unwind: "$orders.productDetails",
            },
            {
              $project: {
                _id: 0,
                productDetails: "$orders.productDetails",
              },
            },
          ]);
          // after cancellation incermenting product quantity
        });
    });
  },
};
