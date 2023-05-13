const user = require("../../models/connection");
const multer = require("multer");
// const { response } = require("../../app");
const adminBannerHelper = require("./adminBannerHelper");
const { resolve, reject } = require("promise");

  module.exports = {
  //get add product

  getAddProduct: () => {
    return new Promise(async (resolve, reject) => {
      await user.category
        .find()
        .exec()
        .then((response) => {
          resolve(response);
        });
    });
  },

  //post add product

  postAddProduct: (userdata, filename) => {
    return new Promise((resolve, reject) => {
      ImageUpload = new user.product({
        Productname: userdata.name,
        ProductDescription: userdata.description,
        Quantity: userdata.quantity,
        Image: filename,
        category: userdata.category,
        Price: userdata.price,
      });
      ImageUpload.save().then((data) => {
        resolve(data);
      });
    });
  },

  getViewProduct: () => {
    return new Promise(async (resolve, reject) => {
      await user.product
        .find()
        .exec()
        .then((response) => {
          resolve(response);
        });
    });
  },

  blockproduct: (productId) => {
    return new Promise(async (resolve, reject) => {
      await user.product.updateOne(
        { _id: productId },
        { $set: { blocked: true } }
      );
      resolve();
    });
  },

  unblockproduct: (productId) => {
    return new Promise(async (resolve, reject) => {
      await user.product.updateOne(
        { _id: productId },
        { $set: { blocked: false } }
      );
      resolve();
    });
  },

  editProduct: (productId) => {
    return new Promise(async (resolve, reject) => {
      await user.product
        .findOne({ _id: productId })
        .exec()
        .then((response) => {
          resolve(response);
        });
    });
  },




  productImage:(productId)=>{
    return new Promise(async (resolve, reject) => {
      await user.product
        .findOne({ _id: productId })
        
        .then((response) => {
          resolve(response);
        });
    });
  },
  //post editproduct

  postEditProduct: (productId, editedData, filename) => {
    return new Promise(async (resolve, reject) => {
      await user.product
        .updateOne(
          { _id: productId },
          {
            $set: {
              Productname: editedData.name,
              ProductDescription: editedData.description,
              Quantity: editedData.quantity,
              Price: editedData.price,
              category: editedData.category,
              Image: filename,
            },
          }
        )
        .then((response) => {
          resolve(response);
        });
    });
  },

  viewAddCategory: () => {
    return new Promise(async (resolve, reject) => {
      await user.category
        .find()
        .exec()
        .then((response) => {
          resolve(response);
        });
    });
  },
};
