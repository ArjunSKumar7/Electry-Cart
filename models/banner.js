const mongoose = require("mongoose");
const bannerSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: {
      type: Date,
      default: Date.now
    },

    bannerblocked:{
      type:Boolean,
      default:false
    }
  });

module.exports = mongoose.model('Banner', bannerSchema);
