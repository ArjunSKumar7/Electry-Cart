const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({

    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    orders: [{
  
  
      name: String,
      productDetails: Array,
      paymentMethod: String,
      paymentStatus: String,
      totalPrice: Number,
      totalQuantity: Number,
      shippingAddress: Object,
      paymentmode: String,
      status: {
        type: Boolean,
        default: true
      },
      createdAt: {
        type: Date,
        default: new Date()
      },
      orderStatus: {
        type: String,
      },
    }
    ]
  })

  module.exports = {
    order: mongoose.model('order', orderSchema),
  };