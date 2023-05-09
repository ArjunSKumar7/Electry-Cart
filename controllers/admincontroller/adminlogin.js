// const { response } = require("../../app")



const adminCredential={
    name:'alAdmin',
    email:'admin@gmail.com',
    password:'admin123'
   }

let adminlogin;



module.exports={

     getAdminLogin:(req,res)=>{
       
       
     res.render("admin/login",{layout:"adminLayout",adminlogin:false}) 
        
         },
         

     postAdminLogin:(req,res)=>{
    
        
        if(req.body.email==adminCredential.email && req.body.password==adminCredential.password)
        {
            
            req.session.adminloggedIn=true
            res.render("admin/admin-dashboard",{layout:"adminLayout",adminlogin:true})
        }else{
            req.session.adminloggedIn=false
            res.redirect("/admin/login") 
        }
       
     },

     getDashboard:(req,res)=>{
        if(req.session.adminloggedIn==true)
        {

            res.render("admin/admin-dashboard", { layout: "adminLayout",adminlogin:true})
        }else{
       
            res.render("admin/login",{layout:"adminLayout",adminlogin:false}) 
        }
       
     },

     getAdminLogOut:(req,res)=>{
        req.session.adminloggedIn=false
        adminlogin=false
          res.redirect("/admin/login")
     },

   

}