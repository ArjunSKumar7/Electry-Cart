const ObjectId = require("mongodb").ObjectId;
const orderSchema = require("../../models/order");
const Razorpay = require("razorpay");
const razorpay = require('../../test/razorpay');
const user = require("../../models/connection");


const instance = new Razorpay({
  key_id: "rzp_test_QHKpFsUnBlrIDB",
  key_secret: "GqE882vECAaQFFxGHyWuA7RA",
});

module.exports = {
  generateRazorpay: (userId, total) => {
    return new Promise(async (resolve, reject) => {
      let orders = await orderSchema.order.find({ userid: userId });
      let order = orders[0].orders.slice().reverse();
      let orderId = order[0]._id;
      total = total * 100;
      console.log("generateRazorpay:", total);
      let options = {
        amount: parseInt(total),
        currency: "INR",
        receipt: "" + orderId,
      };
      instance.orders.create(options, function (err, order) {
        if (err) {
        } else {
          // console.log("New Order:",order)
          resolve(order);
        }
      });
    });
  },

  verifyPayment:(details)=>{
    return new Promise((resolve,reject)=>{
        try{
        const crypto = require('crypto')
        let hmac = crypto.createHmac('sha256', razorpay.secret_id)
        hmac.update(details['payment[razorpay_order_id]'] + "|" + details['payment[razorpay_payment_id]'])
        hmac = hmac.digest('hex')
        if (hmac == details['payment[razorpay_signature]']) {
            resolve()
        } else {
            reject("not match")
        }
        }catch(err){

        }
    })

  },

  changePaymentStatus: (userId, orderId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let orders = await orderSchema.order.find({ userId: userId })

            let orderIndex = orders[0].orders.findIndex(order => order._id == orderId)
            await orderSchema.order.updateOne(
                {
                    'orders._id': ObjectId(orderId)
                },
                {
                    $set: {
                        ['orders.' + orderIndex + '.paymentStatus']: 'Paid',
                        ['orders.' + orderIndex + '.orderStatus']: 'Success'
                    }
                }
            ),
                await user.cart.deleteMany({ userid: orderId })
                    .then(() => {

                        resolve()

                    })
        } catch (err) {
        }

    })
},



};
