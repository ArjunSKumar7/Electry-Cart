// const { response } = require("../../app")



const adminCredential={
    name:'alAdmin',
    email:'admin@gmail.com',
    password:'admin123'
   }

let adminlogin;



module.exports={

     getAdminLogin:(req,res)=>{
       
        if(req.session.adminloggedIn)
         {
            
            console.log("ifgetlog")
            login=true
            res.render("admin/admin-dashboard",{layout:"adminLayout",adminlogin:true})
        }
        else{
            console.log("elsegetlog")
            res.render("admin/login",{layout:"adminLayout",adminlogin:false}) 
        }
         },
         

     postAdminLogin:(req,res)=>{
        console.log(req.body);
        
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
console.log("ifdash")
            res.render("admin/admin-dashboard", { layout: "adminLayout",adminlogin:true})
        }else{
            console.log("elsedash")
            res.render("admin/login",{layout:"adminLayout",adminlogin:false}) 
        }
       
     },

     getAdminLogOut:(req,res)=>{
        req.session.adminloggedIn=false
        adminlogin=false
          res.redirect("/admin/login")
     },

   

}