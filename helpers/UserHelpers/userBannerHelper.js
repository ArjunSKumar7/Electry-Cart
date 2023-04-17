
const bannerdb=require("../../models/banner")

module.exports={

getBanner:()=>{
    return new Promise(async(resolve,reject)=>{
       
        const banner = await bannerdb.find().lean().exec();
        resolve(banner)
    })
}

}