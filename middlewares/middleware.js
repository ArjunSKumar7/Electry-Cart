const user = require("../models/connection");
module.exports = {
  auth: function (req, res, next) {
    if (req.session.adminloggedIn) {
      next();
    } else {
      res.render("admin/login", { layout: "adminLayout", login: false });
    }
  },

  userauth: async function (req, res, next) {
    try {
      console.log(req.session);

      if (req.session.loggedIn) {
        // console.log(req.session.user._id);
        let userDetail = await user.user.findById(req.session.user._id);
        if (userDetail.blocked) {
          req.session.loggedIn = false;
          res.render("user/login");
        } else {
          req.session.loggedIn = true;
        }
        next();
      } else {
        res.render("user/login");
      }
    } catch (err) {
      console.log(err);
    }
  },
};
