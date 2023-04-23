const adminCouponHelper = require("../../helpers/adminHelpers/adminCouponHelper")

module.exports={

    addCoupons: (req, res) => {
        res.render("admin/add-coupons", {layout:"adminLayout",adminlogin:true});
      },

      addNewCoupon: (req, res) => {
        data = {
          couponName: req.body.couponName,
          expiry: req.body.expiry,
          minPurchase: req.body.minPurchase,
          description: req.body.description,
          discountPercentage: req.body.discountPercentage,
          maxDiscountValue: req.body.maxDiscountValue,
        };
        adminCouponHelper.addNewCoupon(data).then((response) => {
            res.json(response)
        });
      },

      generateCoupon: (req, res) => {
        adminCouponHelper .generateCoupon().then((response) => {
          res.json(response);
        });
      },


      newCoupons: async (req, res) => {
        let coupon = await adminCouponHelper .getCoupons();
        const getDate = (date) => {
          let orderDate = new Date(date);
          let day = orderDate.getDate();
          let month = orderDate.getMonth() + 1;
          let year = orderDate.getFullYear();
          return `${isNaN(day) ? "00" : day}-${isNaN(month) ? "00" : month}-${isNaN(year) ? "0000" : year
            }`;
        };
        res.render("admin/coupon", {
          layout: "adminLayout",
          coupon,
          adminlogin:true,
          getDate,
        });
      },

      deleteCoupon: (req, res) => {
        adminCouponHelper.deleteCoupon(req.params.id).then((response) => {
          res.json(response);
        });
      },



    
}