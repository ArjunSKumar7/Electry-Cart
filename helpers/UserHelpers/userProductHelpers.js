
const { ObjectId } = require("mongodb");

const user = require("../../models/connection");


 //display shop
 
 module.exports={
 shopListProduct:()=>{
    return new Promise(async(resolve, reject) => {
      await user.product.find({blocked:false}).exec().then((response)=>{
        resolve(response) 
      })
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




}