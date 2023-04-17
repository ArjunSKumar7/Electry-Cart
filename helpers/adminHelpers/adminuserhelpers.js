const { promiseImpl } = require("ejs")
const { resolve } = require("promise")
const user  = require("../../models/connection")
// const user=require("../../models/connection")

module.exports={

    getUser: () => { 
        console.log(user);
        return new Promise(async (resolve, reject) => {
            let userDetails = []
            await user.user.find().exec().then((result) => {
                userDetails = result
            })
            console.log(userDetails);
            resolve(userDetails)
        })
    },

    blockUser:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            await user.user.updateOne({_id:userId},{$set:{blocked:true}})
            .then((data)=>{
                console.log('blocked');
                resolve()
            })
     })
    },

    unBlockUser:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            await user.user.updateOne({_id:userId},{$set:{blocked:false}})
            .then((data)=>{
                console.log('unblocked');
                resolve()
            })
        })
    },





}