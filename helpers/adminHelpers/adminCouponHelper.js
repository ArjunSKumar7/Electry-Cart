const coupondb = require("../../models/coupon");
const voucher_codes = require("voucher-code-generator");

const objectId = require("mongodb").ObjectId;

module.exports = {
  addNewCoupon: () => {
    return new Promise((resolve, reject) => {
      try {
        coupondb
          .coupon(data)
          .save()
          .then(() => {
            resolve({ status: true });
          });
      } catch (error) {
        console.log(error);
      }
    });
  },

  generateCoupon: () => {
    return new Promise(async (resolve, reject) => {
      try {
        let couponCode = voucher_codes.generate({
          length: 6,
          count: 1,
          charset: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
          prefix: "Kart-",
        });
        resolve({ status: true, couponCode: couponCode[0] });
      } catch (err) {
        console.log(err);
      }
    });
  },

  getCoupons: () => {
    return new Promise((resolve, reject) => {
      try {
        coupondb.coupon.find({}).then((data) => {
          resolve(data);
        });
      } catch (error) {}
    });
  },

  deleteCoupon: (couponId) => {
    return new Promise(async (resolve, reject) => {
      await coupondb.coupon.deleteOne({ _id: couponId }).then((response) => {
        resolve(response);
      });
    });
  },
};
