const adminBannerHelpers = require("../../helpers/adminHelpers/adminBannerHelper");
const bannerdb = require("../../models/banner");

module.exports = {
  getbanner: (req, res) => {
    adminBannerHelpers.getbanner().then((response) => {
      const getbanner = response;

      res.render("admin/banner", {
        layout: "adminLayout",
        getbanner,
        adminlogin: true,
      });
    });
  },

  postbanner: (req, res) => {
    adminBannerHelpers.postbanner(req.body, req.file.filename).then((data) => {
      res.redirect("/admin/banner");
    });
  },

  geteditbanner: (req, res) => {
    adminBannerHelpers.editbanner(req.params.id).then((response) => {
      let editbanner = response;

      res.render("admin/editbanner", {
        layout: "adminLayout",
        editbanner,
        adminlogin: true,
      });
    });
  },

  posteditbanner: (req, res) => {
    adminBannerHelpers
      .posteditbanner(req.params.id, req.body, req?.file?.filename)
      .then((response) => {
        res.redirect("/admin/editbanner");
      });
  },

  blockbanner: (req, res) => {
    adminBannerHelpers.blockbanner(req.params.id).then((response) => {
      res.redirect("/admin/banner");
    });
  },

  unblockbanner: (req, res) => {
    adminBannerHelpers.unblockbanner(req.params.id).then((response) => {
      res.redirect("/admin/banner");
    });
  },
};
