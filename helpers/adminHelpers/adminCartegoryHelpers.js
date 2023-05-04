const user =require("../../models/connection");
// const multer= require('multer');
// const { response } = require("../../app");
const objectid=require("mongodb").ObjectId

 

module.exports={
    
  
  
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
  
      viewAddCategory:()=>{
         return new Promise(async(resolve, reject) => {
              await user.category.find().exec().then((response)=>{
                 
                  resolve(response)
               
              })
          })
      },

    

listCategory:(listcatId)=>{
    return new Promise (async(resolve,reject)=>{
        await user.category.updateOne({_id:listcatId},{$set:{categoryblocked:false}})
        resolve()
        })
    

},

unlistCategory:(listcatId)=>{
    return new Promise (async(resolve,reject)=>{
        await user.category.updateOne({_id:listcatId},{$set:{categoryblocked:true}})
        resolve()
        })
    

},

      editCatogory:(editCategoryId)=>{
        return new Promise(async(resolve, reject) => {
            await user.category.find({_id:objectid(editCategoryId)}).exec().then((response)=>{
                
                resolve(response[0])
            })
        })
    },

    postEditCategory:(editedId,editedName)=>{
        return new Promise(async(resolve, reject) => {
            await user.category.updateOne({_id:editedId},{$set:{CategoryName:editedName}}).then((response)=>{
                resolve(response)
            })
               
        
            
        })
    },




}       