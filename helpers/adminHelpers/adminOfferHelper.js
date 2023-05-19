const user = require("../../models/connection")
const Objectid = require("mongodb").ObjectId;

module.exports={


    removeofferajax: async (offer) => {
      
        return new Promise(async (resolve, reject) => {
          try {
           
            let a = await user.product.findOneAndUpdate(
              { _id:Objectid(offer.offerId)},
              { $set: { Price: offer.removePrice,offerpercentage:"",oldPrice:""} },
              
            ).then((response)=>{
                resolve(response)
            })
           
          } catch (err) {
            console.log("error occurred while removing the offer: ", err);
            reject(err); // Add this line to reject the promise in case of an error
          }
        });
      }
      
    
}