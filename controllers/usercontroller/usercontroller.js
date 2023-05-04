const userhelpers = require("../../helpers/UserHelpers/UserHelpers");
const userWhishlistHelpers = require("../../helpers/UserHelpers/userWhishlistHelpers");
const user = require("../../models/connection");

const accountSid = process.env.TWILIO_ACC_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;
const client = require("twilio")(accountSid, authToken);

const bannerdb = require("../../models/banner");

let loggedinstatus, userSession, cartcount,userId,wishcount;

module.exports = {
  // user home
  getHome: async (req, res) => {
    try {
      let users = req.session.user;
      wishcount = await userWhishlistHelpers.getWishCount(req.session.user._id)
      userSession = req.session.loggedIn;
      if(userSession){
       userId=req.session.user._id
      const count = await user.cart.findOne({ user: req.session.user._id });
      if(count==null){
        req.session.count = 0;
      cartcount = req.session.count;
      }else{
        req.session.count = count.cartItems.length;
        cartcount = req.session.count;
       
      }
     
      
      }

      const bannerresponse = await bannerdb.find({bannerblocked:false});
      res.render("user/user", {
        users,
        userSession,
        bannerresponse,
        cartcount,
        wishcount,
        userId
      });
    } catch (err) {
      res.status(500);
    }
  },
  
  // get user login
  getUserLogin: (req, res) => {
 
    if (req.session.loggedIn) {
      res.redirect("/");
    } else {
      req.session.loggedIn = false;
      userSession = req.session.loggedIn;
      userId=req.session.user._id
      res.render("user/login", { userSession,userId });
      loggedinstatus = true;
    }
  },
  // post user login

  postUserLogin: async (req, res) => {
    try {
      let response = await userhelpers.doLogin(req.body);
      let loggedinstatus = response.loggedinstatus;
      let blockedStatus = response.blockedStatus;
      if (loggedinstatus == true) {
        // let login=true
        req.session.user = response.response.user;
        userId=req.session.user._id
        req.session.loggedIn = true;

        userSession = req.session.loggedIn;
        res.redirect("/");
      } else {
        res.render("user/login", { blockedStatus, loggedinstatus });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  //get signup

  getSignUp: (req, res) => {
    emailStatus = true;
    if (req.session.userloggedIn) {
      res.redirect("/");
    } else {
      res.render("user/signup", { emailStatus });
    }
  },
  //post sign up
  postSignUp: (req, res) => {
    userhelpers.doSignUp(req.body).then((response) => {
      req.session.userloggedIn = true;

     emailStatus = response.status;
      if (emailStatus == true) {
        res.redirect("/login");
      } else {
        res.render("user/signup", { emailStatus });
      }
    });
  },

  getotp: (req, res) => {
    res.render("user/reqotp");
  },

  postotp: async (req, res) => {
    try {
      let number;
      if (req.body.number) {
        number = req.body.number;
      } else {
        number = req.session.number;
      }

      let users = await user.user.find({ phonenumber: number }).exec();
      loggedUser = users;

      if (users == false) {
        res.redirect("/login");
      } else {
        req.session.number = req.body.number;
      
        await client.verify.v2
          .services(serviceSid)
          .verifications.create({ to: `+91${number}`, channel: "sms" })
          .then((verification) => console.log(verification.status));

        res.render("user/otp-entering");
      }
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  },

  getverifyotp: (req, res) => {
    res.render("user/otp-entering");
  },

  postverifyotp: async (req, res) => {
    try {
      const number = req.session.number;

      const otpNumber = req.body.otp;


      const serviceSid = process.env.TWILIO_SERVICE_SID;
     
      const verification_check = await client.verify.v2
        .services(serviceSid)
        .verificationChecks.create({ to: `+91${number}`, code: otpNumber });
      if (verification_check.valid == true) {
        let id = loggedUser[0]._id;
        req.session.user = loggedUser[0];

        req.session.loggedIn = true;
        userSession = req.session.loggedIn;

        const userDoc = await user.user.findOne({ phonenumber: number });

        if (!userDoc.blocked) {
          const bannerresponse = await bannerdb.find();
          res.render("user/user", {
            userSession,
            bannerresponse,
            countdown: 60,
          });
        }
      } else {
        res.redirect("/otp_verify");
      }
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  },

  getPasswordReset: (req, res) => {
    res.render("user/reset-password", { userSession, profileId });
  },

  getProfile: async (req, res) => {
    try {
      req.session.loggedIn = true;
        userSession = req.session.loggedIn;
       userId=req.session.user._id
      let data = await userhelpers.findUser(userId);
      cartcount = req.session.count;
      res.render("user/profile", { userSession,cartcount, userId,data });
    } catch (error) {
      res.status(500)
    }

  },






  logOut: (req, res) => {
    req.session.user = null;
    req.session.loggedIn = false;
    userSession = req.session.loggedIn;

    res.redirect("/login");
  },
};
