
const ObjectId = require("mongodb").ObjectId;

const user = require("../../models/connection");


 //display shop
 
 module.exports={


    addtocart: (proId, userId) => {
        proObj = {
            productId: proId,
            Quantity: 1,
        };
        return new Promise(async (resolve, reject) => {
            let carts = await user.cart.findOne({ user: userId });
            // console.log("carts",carts);
            if (carts) {
                let productExist = carts.cartItems.findIndex(
                    (cartItems) => cartItems.productId == proId
                );
                if (productExist != -1) {
                    user.cart
                        .updateOne(
                            { user: userId, "cartItems.productId": proId },
                            {
                                $inc: { "cartItems.$.Quantity": 1 },
                            }
                        )
                        .then(() => {
                            resolve();
                        });
                } else {
                    await user.cart
                        .updateOne(
                            { user: userId },
                            {
                                $push: {
                                    cartItems: proObj,
                                },
                            }
                        )
                        .then((response) => {
                            response.new = true
                            // console.log("sdfasda",response);
                            resolve(response);
                        });
                }
            } else {
                let cartItems = new user.cart({
                    user: userId,

                    cartItems: proObj,
                });
                await cartItems.save().then((data) => {
                    data.new = true
                    // console.log("sdfasdasdasdasdasdasdasdadsd",data);
                    resolve(data);

                });
            }
        });
    },

    viewCart:(userId)=>{
        // console.log('hare',userId);
        return new Promise(async(resolve,reject)=>{
           let result =  await user.cart
             .aggregate([
                {
                    $match:{
                        user:ObjectId(userId),  

                    },
                },

                {
                    $unwind:"$cartItems",
                },
                {
                    $project:{
                        item:"$cartItems.productId",
                        quantity:"$cartItems.Quantity"
                    },
                },
                // console.log("cartItems before lookup",cartItems),
                {
                    $lookup:{
                        from:"products",
                        localField:"item",
                        foreignField:"_id",
                        as:"carted",

                    },
                },
                // console.log("cartItems after lookup",cartItems),
                {
                    $project:{
                        item:1,
                        quantity:1,
                        cartItems:{$arrayElemAt:["$carted",0]},
                    }
                },
             ])
             .then((cartItems)=>{
                // console.log("sdsdsdasdasda",cartItems);
                resolve(cartItems);
             })
        })
    },

    getCartItemsCount: (userId) => {
        return new Promise(async (resolve, reject) => {
            let count = 0;
            let cart = await user.cart.findOne({ user: userId });
            if (cart) {
                count = cart.cartItems.length;
            }
            resolve(count);
        });
    },

    totalCheckOutAmount: (userId) => {
        return new Promise(async (resolve, reject) => {
            const id = await user.cart
                .aggregate([
                    {
                        $match: {
                            user: ObjectId(userId),
                        },
                    },
                    {
                        $unwind: "$cartItems",
                    },

                    {
                        $project: {
                            item: "$cartItems.productId",
                            quantity: "$cartItems.Quantity",
                        },
                    },

                    {
                        $lookup: {
                            from: "products",
                            localField: "item",
                            foreignField: "_id",
                            as: "carted",
                        },
                    },
                    {
                        $project: {
                            item: 1,
                            quantity: 1,
                            product: { $arrayElemAt: ["$carted", 0] },
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            total: { $sum: { $multiply: ["$quantity", "$product.Price"] } },
                        },
                    },
                ])
                .then((total) => {
                    resolve(total[0]?.total);
                });
        });
    },

    changeProductQuantity: (data) => {
        count = parseInt(data.count);
        quantity = parseInt(data.quantity);
        return new Promise((resolve, reject) => {
            if (count == -1 && quantity == 1) {
                user.cart
                    .updateOne(
                        { _id: data.cart },
                        {
                            $pull: { cartItems: { productId: data.product } },
                        }
                    )
                    .then(() => {
                        resolve({ removeProduct: true });
                    });
            } else {
                user.cart
                    .updateOne(
                        { _id: data.cart, "cartItems.productId": data.product },
                        {
                            $inc: { "cartItems.$.Quantity": count },
                        }
                    )
                    .then(() => {
                        resolve({ status: true });
                    });
            }
        });
    },

            deleteCart: (data) => {
        return new Promise((resolve, reject) => {
            user.cart
                .updateOne(
                    { _id: data.cartId },
                    {
                        $pull: { cartItems: { productId: data.product } },
                    }
                )
                .then(() => {
                    resolve({ removeProduct: true });
                });
        });
    },



}