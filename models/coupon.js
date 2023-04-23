const mongoose = require("mongoose");
const couponSchema = new mongoose.Schema({
    couponName: String,
    expiry: {
      type: Date,
      default: new Date(),
    },
    minPurchase: Number,
    discountPercentage: Number, 
    maxDiscountValue: Number,
    couponApplied: {
      type: String,
      default: false
    },
    isActive: {
      type: Boolean,
      default: false
    },
    description: String,
    createdAt: {
      type: Date,
      default: new Date(),
    },
  });

  module.exports = { coupon: mongoose.model("coupon", couponSchema)}
 