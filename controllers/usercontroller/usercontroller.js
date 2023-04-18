const userhelpers = require("../../helpers/UserHelpers/UserHelpers");
const user = require("../../models/connection");

const accountSid = process.env.TWILIO_ACC_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;
const client = require("twilio")(accountSid, authToken);

const bannerdb = require("../../models/banner");

let loggedinstatus, userSession, cartcount;

module.exports = {
  // user home
  getHome: async (req, res) => {
    try {
      let users = req.session.user;
      userSession = req.session.loggedIn;
      // cartcount==null;
      if(userSession){
      const count = await user.cart.findOne({ user: req.session.user._id });
      
      req.session.count = count.cartItems.length;
      cartcount = req.session.count;
      }

      const bannerresponse = await bannerdb.find();
      res.render("user/user", {
        users,
        userSession,
        bannerresponse,
        cartcount,
      });
    } catch (err) {
      res.status(500);
    }
  },
  
  // get user login
  getUserLogin: (req, res) => {
    arjun = false;
    if (req.session.loggedIn) {
      res.redirect("/");
    } else {
      req.session.loggedIn = false;
      userSession = req.session.loggedIn;
      res.render("user/login", { userSession });
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

      var emailStatus = response.status;
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

  logOut: (req, res) => {
    req.session.user = null;
    req.session.loggedIn = false;
    userSession = req.session.loggedIn;

    res.redirect("/login");
  },
};
