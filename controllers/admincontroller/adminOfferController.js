const adminOfferHelper =require("../../helpers/adminHelpers/adminOfferHelper")
const adminProductHelpers =require("../../helpers/adminHelpers/adminProductHelpers")


module.exports={


    productoffer:async(req,res)=>{
        adminProductHelpers.getViewProduct().then((response) => {
            res.render("admin/add-productoffer", {
                layout: "adminLayout",
                response,
        
                adminlogin: true,
              });


        })
    },


    productofferajax:async(req,res)=>{
        adminProductHelpers.productofferajax(req.body).then((response)=>{
res.json({status:true})
        })
    }
    

}