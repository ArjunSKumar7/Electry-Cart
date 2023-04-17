const { response } = require("express")
const adminBannerHelpers=require("../../helpers/adminHelpers/adminBannerHelper")
const bannerdb=require("../../models/banner")
const { Admin } = require("mongodb")


module.exports={

    getbanner:(req,res)=>{

        adminBannerHelpers.getbanner().then((response)=>{
            console.log("getbannerhelperresponse"+response)
            const getbanner=response

            res.render("admin/banner",{layout:"adminLayout",getbanner,adminlogin:true})
        })

        

    },





    postbanner:(req,res)=>{
        adminBannerHelpers.postbanner(req.body,req.file.filename).then((data)=>{
            res.redirect('/admin/banner')
        })
    },

    
    // editCategory:(req,res)=>{
   
    //     adminCategoryHelper.editCatogory(req.params.id).then((response)=>{
         
         
    //      console.log("sdsddfsdfsdfsdfsdfsdfsfds"+response)
         
    //      res.render('admin/edit-category',{layout:"adminLayout",response,adminlogin:true})
    //     })
    //  },  

    geteditbanner:(req,res)=>{
        adminBannerHelpers.editbanner(req.params.id).then((response)=>{
            console.log("geteditbannerrespanse",response)

            res.render("/admin/editbanner",{layout:"adminLayout",response,adminlogin:true})
        })
    },

    blockbanner:(req,res)=>{
        adminBannerHelpers.blockbannner(req.params.id).then((response)=>{
          res.redirect("/admin/view_product")
        })
      },

      unblockbanner:(req,res)=>{
        adminBannerHelpers.unblockbanner(req.params.id).then((response)=>{
          res.redirect('/admin/view_product')

        })
      },
    

}