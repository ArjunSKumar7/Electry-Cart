
const { ObjectId } = require("mongodb");

const user = require("../../models/connection");
const { resolveInclude } = require("ejs");


 //display shop
 
 module.exports={
 shopListProduct:(catName=null)=>{
    return new Promise(async(resolve, reject) => {
      if(catName!== null){
       console.log("aaaa",catName);
       
       await user.product.find({blocked:false,category:catName}).then((response)=>{
        resolve(response) 
      })
      }else{
        await user.product.find({blocked:false}).exec().then((response)=>{
          resolve(response) 
        })

      }
     
    })
  },


  viewProductDetails:(requestedId)=>{
    return new Promise(async (resolve, reject) => {
      await user.product.findOne({ _id: requestedId }).then((response) => {
        console.log("id:"+requestedId);
        resolve(response)
      })
    })
},
viewAddCategory:(catName=0)=>{

  return new Promise(async (resolve, reject) => {
    if(catName==0){
      await user.category.find({categoryblocked: false}).then((response) => {
        // console.log("ccccccccccccccccccccccccccccccccccccccccccccccccccccc",response);
        resolve(response)
      })
    }else{

      await user.category.find({categoryblocked: false,CategoryName:catName}).then((response) => {
        console.log("ccccccccccccccccccccccccccccccccccccccccccccccccccccc",response);
        resolve(response)
      })
    }
  })
},




}