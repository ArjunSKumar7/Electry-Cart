const user = require("../../models/connection");
const ObjectId = require("mongodb").ObjectId;
module.exports = {
  checkOutpage: (userId) => {
    return new Promise(async (resolve, reject) => {
      await user.address
        .aggregate([
          {
            $match: {
              userid: ObjectId(userId),
            },
          },
          {
            $unwind: "$Address",
          },
          {
            $project: {
              item: "$Address",
            },
          },
        ])
        .then((address) => {
          resolve(address);
        });
    });
  },

  postAddress: (userId, data) => {
    return new Promise(async (resolve, reject) => {
      let addressInfo = {
        fname: data.fname,
        lname: data.lname,
        street: data.street,
        apartment: data.apartment,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        mobile: data.mobile,
        email: data.email,
      };

      let AddressInfo = await user.address.findOne({ userid: userId });
      if (AddressInfo) {
        await user.address
          .updateOne(
            { userid: userId },
            {
              $push: {
                Address: addressInfo,
              },
            }
          )
          .then((response) => {
            resolve(response);
          });
      } else {
        let addressData = new user.address({
          userid: userId,

          Address: addressInfo,
        });

        await addressData.save().then((response) => {
          resolve(response);
        });
      }
    });
  },
};
