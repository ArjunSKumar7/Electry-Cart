const { ObjectId } = require("mongodb");

const user = require("../../models/connection");
const { resolveInclude } = require("ejs");

//display shop

module.exports = {
  shopListProduct: (catName, page, perPage) => {
    console.log("catname", catName);
    return new Promise(async (resolve, reject) => {
      if (catName !== undefined) {
        await user.product
          .find({ blocked: false, category: catName })
          .skip((page - 1) * perPage)
          .limit(perPage)
          .then((response) => {
            resolve(response);
          });
      } else {
        await user.product
          .find({ blocked: false })
          .skip((page - 1) * perPage)
          .limit(perPage)
          .then((response) => {
            resolve(response);
          });
      }
    });
  },

  viewProductDetails: (requestedId) => {
    return new Promise(async (resolve, reject) => {
      await user.product.findOne({ _id: requestedId }).then((response) => {
        resolve(response);
      });
    });
  },
  viewAddCategory: (catName = 0) => {
    return new Promise(async (resolve, reject) => {
      if (catName == 0) {
        await user.category
          .find({ categoryblocked: false })
          .then((response) => {
            resolve(response);
          });
      } else {
        await user.category
          .find({ categoryblocked: false, CategoryName: catName })
          .then((response) => {
            resolve(response);
          });
      }
    });
  },

  searchByKey:(keyword)=>{
    return new Promise(async(resolve,reject)=>{


  const regex=new RegExp(keyword,'i')

  await user.product.find({Productname:{$regex:regex}}).limit(5).then((response)=>{
    resolve(response)
  })



    })
  },


  sortByPrice:(sortvalue)=>{
return new Promise(async(resolve,reject)=>{
let sort;
  if(sortvalue=="price-low-to-high"){
    sort=1
    
  }else{
    sort=-1

  }

  await user.product.find().limit(5).sort({Price:sort}).then((response)=>{
    resolve(response)
  })

})


  }


};
