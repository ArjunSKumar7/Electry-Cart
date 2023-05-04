const { response } = require("express")
const bannerdb=require("../../models/banner")
const objectid=require('mongodb').ObjectId

module.exports={


    getbanner:()=>{
        return new Promise(async(resolve,reject)=>{
            await bannerdb.find().exec().then((response)=>{
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




    editbanner:(bannerId)=>{
        return new Promise(async(resolve,reject)=>{
            await bannerdb.findOne({_id:bannerId}).exec().then((response)=>{
                resolve(response)
              
            })
        })
    },





posteditbanner:(bannerId,editdata,filename)=>{

    return new Promise(async(resolve,reject)=>{
        await bannerdb.updateOne({_id:bannerId},{$set:{
            title:editdata.title,
            description:editdata.description,
            link:editdata.link,
            image:filename
        }}).then((response)=>{
            resolve(response)
        })
    })

},







    blockbanner:(bannerId)=>{
        return new Promise(async(resolve,reject)=>{
            await bannerdb.updateOne({_id:bannerId},{$set:{bannerblocked:true}})

            resolve()
        })
    },

    unblockbanner:(bannerId)=>{
        return new Promise(async(resolve,reject)=>{
          const updateunblock=  await bannerdb.updateOne({_id:bannerId},{$set:{bannerblocked:false}})
            resolve(updateunblock)
        })
    },


}