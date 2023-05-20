const ObjectId = require("mongodb").ObjectId;
const user = require("../../models/connection");
const coupondb = require("../../models/coupon");
const voucher_codes = require("voucher-code-generator");

module.exports = {
  couponValidator: async (code, userId, total) => {
    return new Promise(async (resolve, reject) => {
      try {
        let discountAmount;
        let couponTotal;
        let userId=req.session.user._id
        let coupon = await coupondb.coupon.findOne({ couponName: code });

        if (coupon) {
          if (coupon.expiry >= new Date()) {
             //     let userCouponExists = await user.user.findOne({ _id: userId, 'coupons.couponName': code })
            if (total >= coupon?.minPurchase) {
              discountAmount = (total * coupon.discountPercentage) / 100;
              if (discountAmount > coupon?.maxDiscountValue) {
                discountAmount = coupon?.maxDiscountValue;
                couponTotal = total - discountAmount;
              }
              resolve({
                discountAmount,
                couponTotal,
                total,
                success: ` ${code} ` + "Coupon  Applied  SuccessFully",
              });
            }
          } else {
            resolve({ status: false, err: "coupon expired" });
          }
          couponTotal = total - discountAmount;
        } else {
          resolve({ status: false, err: "coupon does'nt exist" });
        }
        // let couponExists = await coupondb.coupon.findOne({ 'coupons.couponName': code })

        // if (couponExists) {

        //   if (new Date(couponExists.expiry) - new Date() > 0) {

        //     let userCouponExists = await user.user.findOne({ _id: userId, 'coupons.couponName': code })

        //     if (!userCouponExists) {
        //       resolve({ discountAmount, couponTotal, total, success: ` ${code} ` + 'Coupon  Applied  SuccessFully' })
        //     } else {
        //       resolve({ status: true, err: "This Coupon Already Used" })
        //     }
        //   } else {
        //     resolve({ status: false, err: 'coupon expired' })
        //   }
        // } else {
        //   resolve({ status: false, err: "coupon does'nt exist" })
        // }
      } catch (error) {
        console.log(error);
      }
    });
  },

  addCouponIntUseroDb: (couponData, userId) => {
    let couponObj = {
      couponstatus: true,
      couponName: couponData.couponName,
    };
    return new Promise(async (resolve, reject) => {
      let response = await user.user.updateOne(
        { _id: userId },
        {
          $push: {
            coupons: couponObj,
          },
        }
      );
      resolve(response);
    });
  },
};
