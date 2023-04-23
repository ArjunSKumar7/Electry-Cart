const { response } = require("express")
const bannerdb=require("../../models/banner")
const objectid=require('mongodb').ObjectId

module.exports={


    getbanner:()=>{
        return new Promise(async(resolve,reject)=>{
            await bannerdb.find().exec().then((response)=>{
                // console.log("getbannerhelper",response)
                resolve(response)
            })
        })
    },

    postbanner:(data,image)=>{
        return new Promise(async(resolve,reject)=>{
            const bannerData=new bannerdb({
                title:data.bannertitle,
                description:data.bannerdescription,
                link:data.bannerlink,
                image:image
            })

            await bannerData.save().then((data)=>{
                
                resolve(data)
            })
        })
    },


    // editProduct:(productId)=>{
    //     return new Promise(async(resolve, reject) => {
    //          await user.product.findOne({_id:productId}).exec().then((response)=>{
    //             resolve(response)
    //             console.log(response);
    //          })
    //     })
    // },

    editbanner:(bannerId)=>{
        return new Promise(async(resolve,reject)=>{
            await bannerdb.findOne({_id:bannerId}).exec().then((response)=>{
                resolve(response)
                console.log("editbannerresponsehelper",response)
            })
        })
    },

    // postEditProduct:(productId,editedData,filename)=>{
    //     return new Promise(async(resolve, reject) => {
    //        await user.product.updateOne({_id:productId},{$set:{
    //         Productname:editedData.name,
    //         ProductDescription:editedData.description,
    //         Quantity:editedData.quantity,
    //         Price:editedData.price,
    //         category:editedData.category,
    //         Image:filename
    //        }}) .then((response)=>{
    //     console.log(response);
    //         resolve(response)
    //        }) 
    //     })
    // },



posteditbanner:(bannerId,editdata,filename)=>{

    // console.log("Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",editdata)
    return new Promise(async(resolve,reject)=>{
        await bannerdb.updateOne({_id:bannerId},{$set:{
            title:editdata.title,
            description:editdata.description,
            link:editdata.link,
            image:filename
        }}).then((response)=>{
            console.log(response);
            resolve(response)
        })
    })

},







    blockbanner:(bannerId)=>{
console.log("blockbannercont",bannerId)
        return new Promise(async(resolve,reject)=>{
            await bannerdb.updateOne({_id:bannerId},{$set:{bannerblocked:true}})

            resolve()
        })
    },

    unblockbanner:(bannerId)=>{
        console.log("blockbannercont",bannerId)
        return new Promise(async(resolve,reject)=>{
          const updateunblock=  await bannerdb.updateOne({_id:bannerId},{$set:{bannerblocked:false}})
            resolve(updateunblock)
        })
    },


}