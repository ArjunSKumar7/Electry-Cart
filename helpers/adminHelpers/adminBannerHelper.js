const { response } = require("express")
const bannerdb=require("../../models/banner")
const objectid=require('mongodb').ObjectId

module.exports={


    getbanner:()=>{
        return new Promise(async(resolve,reject)=>{
            await bannerdb.find().exec().then((response)=>{
                console.log("getbannerhelper "+response)
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

    // editbanner:(bannerId)=>{
    //     return new Promise(async(resolve,reject)=>{
    //         await bannerdb.findOne({id:bannerId}).exec().then((response)=>{
    //             resolve(response)
    //             console.log("editbannerresponsehelper",response)
    //         })
    //     })
    // },


    // blockbanner:(productId)=>{

    //     return new Promise(async(resolve,reject)=>{
    //         await bannerdb.updateOne({_id:productId},{$set:{blocked:true}})
    //         resolve()
    //     })
    // },

    // unblockbanner:(productId)=>{
    //     return new Promise(async(resolve,reject)=>{
    //         await bannerdb.updateOne({_id:productId},{$set:{blocked:false}})
    //         resolve()
    //     })
    // },


}