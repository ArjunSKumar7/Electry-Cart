// const { response } = require("../../app")
const adminuserhelpers = require("../../helpers/adminHelpers/adminuserhelpers")
const user = require("../../models/connection");

module.exports={
      //***********get user view***********//
      getViewUser:(req,res)=>{
            adminuserhelpers.getUser().then((user)=>{
                  res.render("admin/view-users",{layout:"adminLayout",user,adminlogin:true});
            })
        
      },
      //***********Block user**********//

      getBlockUser:(req,res)=>{
            console.log(req.params);
            adminuserhelpers.blockUser(req.params.id).then((response)=>{
                  res.redirect('back')
            })
            
      },

      //***********UnBlock user**********//

      getUnblockUser:(req,res)=>{
            adminuserhelpers.unBlockUser(req.params.id).then((response)=>{
                  res.redirect('back')
            })
      },


      

}