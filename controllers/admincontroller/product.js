// const { response } = require("../../app")
const adminProductHelpers = require("../../helpers/adminHelpers/adminProductHelpers")
const user = require("../../models/connection");



 

module.exports={
    getAddProduct:(req,res)=>{

    adminProductHelpers.getAddProduct().then((response)=>{
        console.log("krjhriuhirhrifhrifvhriufvhrifvhrihvrifuhruihbrighbrighbtigbh ",response)
        res.render("admin/add-product", { layout: "adminLayout",response,adminlogin:true});
    })
    },

   

    postAddProduct: (req, res) =>{
      
      let image= req.files.map(files=>(files.filename))
      console.log(image)

      adminProductHelpers.postAddProduct(req.body,image).then((response)=>{
        res.redirect('/admin/view_product')
      })
    },



      getViewproduct:(req,res) =>{
        let admins=req.session.admin
        adminProductHelpers.getViewProduct().then((response)=>{
          res.render("admin/view-product", { layout: "adminLayout" ,response,admins,adminlogin:true});
        })
        
      },

      blockproduct:(req,res)=>{
        adminProductHelpers.blockproduct(req.params.id).then((response)=>{
          res.redirect("/admin/view_product")
        })
      },

      unblockproduct:(req,res)=>{
        adminProductHelpers.unblockproduct(req.params.id).then((response)=>{
          res.redirect('/admin/view_product')

        })
      },


      // deleteViewProduct:(req,res) =>{
    
      //   adminProductHelpers.deleteViewProduct(req.params.id).then((response)=>{
      //     res.redirect('/admin/view_product')
      //   })
      
      // },

        
  editViewProduct:(req,res) =>{
    let admins=req.session.admin
    adminProductHelpers.viewAddCategory().then((response)=>{
  
      var procategory=response
      adminProductHelpers.  editProduct(req.params.id).then((response)=>{
        editproduct=response
       
      res.render('admin/edit-viewproduct',{ layout: "adminLayout" ,editproduct,procategory,admins,adminlogin:true});
  
    })})
    
    
  
  },
  
  //posteditaddproduct
  
  
  postAddEditProduct:(req,res) =>{
    
    adminProductHelpers.postEditProduct(req.params.id,req.body,req?.file?.filename).then((response)=>{
      console.log(response);
      res.redirect('/admin/view_product')
    })
  
    
  },
  

   









}