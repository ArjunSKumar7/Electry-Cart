const user = require("../../models/connection");
const bcrypt=require('bcrypt');


module.exports = {
  //sign up
  doSignUp: (userData) => {
     let response={};
    return new Promise(async(resolve,reject)=>{
      
  try{
    email=userData.email;
    existingUser =await user.user.findOne({email})
    if(existingUser)
    {
        response={status:false}
    return resolve(response) 

    }
    else{
        var hashedPassword=await bcrypt.hash(userData.password,10);
        const data=new user.user({ 
           
              username: userData.username,
               Password: hashedPassword,
               email: userData.email,
               phonenumber: userData.number,
             })
       
        await data.save(data).then((data)=>{
          resolve({data,status:true})
        })
      }
    }
   
  catch(err){
     console.log(err);
  }

    
  })
  
  

  },

  //login




  doLogin: async (userData) => {
    try {
        let response = {}
        let loginstatus = false
        let users = await user.user.findOne({ email: userData.email })
       
        if (users) {
            if (users.blocked == false) {
                let status = await bcrypt.compare(userData.password, users.Password)
                if (status) {
                    response.user = users
                    response.status = true
                    userName = users.username
                    return { response, loggedinstatus: true, userName }
                } else {
                    return { loggedinstatus: false }
                }
            } else {
                return { blockedStatus: true }
            }
        } else {
            return { loggedinstatus: false }
        }
    } catch (err) {
        console.log(err);
    }
},

findUser: (userId) => {
  return new Promise(async (resolve, reject) => {
    await user.user.findById({ _id: userId }).then((user) => {

      resolve(user)
    })

  })
},

getlatestproducts:()=>{

    return new Promise(async(resolve, reject) => {
    await user.product.find().sort({_id: -1}).limit(4).then((products)=>{
       
          resolve(products);
        
   
    });
  })

}
 

}
  






