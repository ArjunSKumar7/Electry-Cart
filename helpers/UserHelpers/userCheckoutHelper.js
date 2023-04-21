const user = require("../../models/connection");

module.exports={
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

            }



            let AddressInfo = await user.address.findOne({ userid: userId })
            if (AddressInfo) {


                await user.address.updateOne({ userid: userId },
                    {
                        "$push":
                        {
                            "Address": addressInfo

                        }
                    }).then((response) => {
                        resolve(response)
                    })



            } else {


                let addressData = new user.address({
                    userid: userId,

                    Address: addressInfo

                })

                await addressData.save().then((response) => {
                    resolve(response)
                });
            }
        })

    },

}