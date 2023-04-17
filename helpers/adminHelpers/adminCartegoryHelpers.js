const user =require("../../models/connection");
// const multer= require('multer');
// const { response } = require("../../app");
const objectid=require("mongodb").ObjectId

 

module.exports={
    
    //add category

    // addCategory:(data)=>{
    //     return   new Promise(async(resolve,reject)=>{
    //          const categoryData=new user.category({
    //           CategoryName:data.categoryname
    //          })
                                            
    //          await categoryData.save().then((data)=>{
             
    //           resolve(data)
              
    //          })
    //       })
    //   },


//     addCategory: (data) => {
//   return new Promise(async (resolve, reject) => {
//     const categoryData = new user.category({
//       CategoryName: data.categoryname
//     });

//     // Check if category already exists
//     const existingCategory = await user.category.findOne({ CategoryName: data.categoryname });
//     if (!existingCategory) {
    
//     }

//     // Save the new category
//     await categoryData.save().then((data) => {
//       resolve(data);

//         const error = new Error('Category already exists');
//       error.statusCode = 400;
//       return reject(error);
//     }).catch((error) => {
//       reject(error);
//     });
//   });
// },
  
addCategory: (data) => {
    let response = {};

    return new Promise(async (resolve, reject) => {
      let category = data.categoryname;
      existingCategory = await user.category.findOne({
        CategoryName: category,
      });
      if (existingCategory) {
        console.log("category exists");
        response = { categoryStatus: true };
        resolve(response);
      } else {
        console.log("category not exist");
        const categoryData = new user.category({
            CategoryName: data.categoryname,
        });
        console.log(categoryData);
        await categoryData.save().then((data) => {
          console.log(data);
          resolve(data);
        });
      }
    });
  },













      //view category
  
      viewAddCategory:()=>{
         return new Promise(async(resolve, reject) => {
              await user.category.find().exec().then((response)=>{
                console.log(response);
                 
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
        console.log(editedId);
        console.log(editedName);
        return new Promise(async(resolve, reject) => {
            await user.category.updateOne({_id:editedId},{$set:{CategoryName:editedName}}).then((response)=>{
                resolve(response)
                console.log(response);
            })
               
        
            
        })
    },




}       