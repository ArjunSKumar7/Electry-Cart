const { ObjectId } = require("mongodb");
const user = require("../../models/connection");
// const multer= require('multer');
// const { response } = require("../../app");
const objectid = require("mongodb").ObjectId;

module.exports = {
  addCategory: (data) => {
    let response = {};

    return new Promise(async (resolve, reject) => {
      let category = data.categoryname;
      existingCategory = await user.category.findOne({
        CategoryName: category,
      });
      if (existingCategory) {
        response = { categoryStatus: true };
        resolve(response);
      } else {
        const categoryData = new user.category({
          CategoryName: data.categoryname,
        });
        await categoryData.save().then((data) => {
          resolve(data);
        });
      }
    });
  },

  //view category

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

  listCategory: (listcatId) => {
    return new Promise(async (resolve, reject) => {
      let catname= await user.category.findOne({_id: objectid(listcatId) })
      await user.category.updateOne(
        { _id: listcatId },
        { $set: { categoryblocked: false } }
      );
      await user.product.updateMany({category:catname.CategoryName},{$set:{blocked:false}})
      resolve();
     
    });
  },

  unlistCategory: async(listcatId) => {
    console.log("listcatId",listcatId);
    return new Promise(async (resolve, reject) => {
     let catname= await user.category.findOne({_id: objectid(listcatId) })
     console.log(typeof(catname));
      await user.category.updateOne(
        { _id: listcatId },
        { $set: { categoryblocked: true } }
        
      );
      await user.product.updateMany({category:catname.CategoryName},{$set:{blocked:true}})
      resolve();
    });
  },

  editCatogory: (editCategoryId) => {
    return new Promise(async (resolve, reject) => {
      await user.category
        .find({ _id: objectid(editCategoryId) })
        .exec()
        .then((response) => {
          resolve(response[0]);
        });
    });
  },

  postEditCategory: (editedId, editedName) => {
    return new Promise(async (resolve, reject) => {
      await user.category
        .updateOne({ _id: editedId }, { $set: { CategoryName: editedName } })
        .then((response) => {
          resolve(response);
        });
    });
  },
};
