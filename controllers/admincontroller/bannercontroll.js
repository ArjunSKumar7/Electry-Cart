const { response } = require("express")
const adminBannerHelpers=require("../../helpers/adminHelpers/adminBannerHelper")
const bannerdb=require("../../models/banner")
const { Admin } = require("mongodb")


module.exports={

    getbanner:(req,res)=>{

        adminBannerHelpers.getbanner().then((response)=>{
            // console.log("getbannerhelperresponse"+response)
            const getbanner=response

            res.render("admin/banner",{layout:"adminLayout",getbanner,adminlogin:true})
        })

        

    },





    postbanner:(req,res)=>{
        adminBannerHelpers.postbanner(req.body,req.file.filename).then((data)=>{
            res.redirect('/admin/banner')
        })
    },

    
    // editViewProduct:(req,res) =>{
    //   let admins=req.session.admin
    //   adminProductHelpers.viewAddCategory().then((response)=>{
    
    //     var procategory=response
    //     adminProductHelpers.  editProduct(req.params.id).then((response)=>{
    //       editproduct=response
         
    //     res.render('admin/edit-viewproduct',{ layout: "adminLayout" ,editproduct,procategory,admins,adminlogin:true});
    
    //   })})
      
      
    
    // }, 

    geteditbanner:(req,res)=>{
        adminBannerHelpers.editbanner(req.params.id).then((response)=>{
            // console.log("geteditbannerrespanse",response)
            let editbanner=response

            res.render("admin/editbanner",{layout:"adminLayout",editbanner,adminlogin:true})
        })
    },


    posteditbanner:(req,res) =>{
    
      adminBannerHelpers.posteditbanner(req.params.id,req.body,req?.file?.filename).then((response)=>{
        // console.log(response);
        res.redirect('/admin/editbanner')
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