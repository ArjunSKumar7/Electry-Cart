// const { response } = require('../../app');
const adminCategoryHelper= require('../../helpers/adminHelpers/adminCartegoryHelpers');
const { category } = require('../../models/connection');
const user = require("../../models/connection");



let viewCategory;
module.exports={
    
//get method category
getCategory:(req, res)=>{
    let admins=req.session.admin
    adminCategoryHelper.viewAddCategory().then((response)=>{
      
      viewCategory=response
      
     
      res.render("admin/add-category", { layout: "adminLayout" ,viewCategory,admins,adminlogin:true});
    })
    
  },

  postCategory: (req, res) => {
    adminCategoryHelper.addCategory(req.body).then((data) => {
      let categoryStatus = data.categoryStatus;
      if (categoryStatus == false) {
        res.redirect("/admin/add_category");
      } else {
        adminCategoryHelper.viewAddCategory().then((response) => {
          viewCategory = response;
          res.render("admin/add-category", {
            layout: "adminLayout",
           
            viewCategory,
            categoryStatus,
            adminlogin:true
          });
        });
      }
    });
  },
 
  
  listCategory:(req,res)=>{
adminCategoryHelper.listCategory(req.params.id).then((response)=>{
  res.redirect('/admin/add_category')
})
  },

  unlistCategory:(req,res)=>{
    adminCategoryHelper.unlistCategory(req.params.id).then((response)=>{
      res.redirect('/admin/add_category')
    })
      },

  

  editCategory:(req,res)=>{
   
     adminCategoryHelper.editCatogory(req.params.id).then((response)=>{
      
      
     
      
      res.render('admin/edit-category',{layout:"adminLayout",response,adminlogin:true})
     })
  },   

  postEditCategory:(req,res)=>{
   
     adminCategoryHelper.postEditCategory(req.params.id,req.body.editCategoryname).then((response)=>{
    
      res.redirect('/admin/add_category')
     })
    
  },
  

   
        
 

}