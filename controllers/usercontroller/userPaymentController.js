const userPaymentHelpers=require('../../helpers/UserHelpers/userPaymemtHelper')


module.exports={

    postVerifyPayment:async (req,res)=>{
        await userPaymentHelpers.verifyPayment(req.body).then(() => {

            userPaymentHelpers.changePaymentStatus(req.session.user._id, req.body['order[receipt]']).then(() => {
      
              res.json({ status: true })
      
            }).catch((err) => {
              res.json({ status: false, err })
            })
      
          })
      
      
        },

}