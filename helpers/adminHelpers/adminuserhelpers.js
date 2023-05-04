const { promiseImpl } = require("ejs")
const { resolve } = require("promise")
const user  = require("../../models/connection")
// const user=require("../../models/connection")

module.exports={

    getUser: () => { 
        return new Promise(async (resolve, reject) => {
            let userDetails = []
            await user.user.find().exec().then((result) => {
                userDetails = result
            })
            resolve(userDetails)
        })
    },

    blockUser:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            await user.user.updateOne({_id:userId},{$set:{blocked:true}})
            .then((data)=>{
                resolve()
            })
     })
    },

    unBlockUser:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            await user.user.updateOne({_id:userId},{$set:{blocked:false}})
            .then((data)=>{
                resolve()
            })
        })
    },





}