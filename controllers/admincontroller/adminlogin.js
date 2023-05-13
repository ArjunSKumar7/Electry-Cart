const adminOrderHelper = require("../../helpers/adminHelpers/adminOrderHelper");
const adminCredential = {
  name: "alAdmin",
  email: "admin@gmail.com",
  password: "admin123",
};

let adminlogin;

module.exports = {


  getAdminLogin: async (req, res) => {
    res.redirect("/admin");
  },



  postAdminLogin: (req, res) => {
    if (
      req.body.email == adminCredential.email &&
      req.body.password == adminCredential.password
    ) {
      req.session.adminloggedIn = true;
      res.redirect("/admin");
    } else {
      req.session.adminloggedIn = false;
      res.redirect("/admin/login");
    }
  },



  getDashboard: async (req, res) => {
    let saleData = await adminOrderHelper.admindashboard();
    console.log("salesData",saleData)
 
    if (req.session.adminloggedIn == true) {
      res.render("admin/admin-dashboard", {
        layout: "adminLayout",
        adminlogin: true,
        saleData
      });
    } else {
      res.render("admin/login", { layout: "adminLayout", adminlogin: false });
    }
  },



  getAdminLogOut: (req, res) => {
    req.session.adminloggedIn = false;
    adminlogin = false;
    res.redirect("/admin/login");
  },
};
