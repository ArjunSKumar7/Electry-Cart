const adminProductHelpers = require("../../helpers/adminHelpers/adminProductHelpers");
const user = require("../../models/connection");

module.exports = {
  getAddProduct: (req, res) => {
    adminProductHelpers.getAddProduct().then((response) => {
      res.render("admin/add-product", {
        layout: "adminLayout",
        response,
        adminlogin: true,
      });
    });
  },

  postAddProduct: (req, res) => {
    let image = req.files.map((files) => files.filename);
adminProductHelpers.postAddProduct(req.body, image).then((response) => {
      res.redirect("/admin/view_product");
    });
  },

  getViewproduct: (req, res) => {
    let admins = req.session.admin;
    adminProductHelpers.getViewProduct().then((response) => {
      res.render("admin/view-product", {
        layout: "adminLayout",
        response,
        admins,
        adminlogin: true,
      });
    });
  },

  blockproduct: (req, res) => {
    adminProductHelpers.blockproduct(req.params.id).then((response) => {
      res.redirect("/admin/view_product");
    });
  },

  unblockproduct: (req, res) => {
    adminProductHelpers.unblockproduct(req.params.id).then((response) => {
      res.redirect("/admin/view_product");
    });
  },

  editViewProduct: (req, res) => {
    let admins = req.session.admin;
    adminProductHelpers.viewAddCategory().then((response) => {
      var procategory = response;
      adminProductHelpers.editProduct(req.params.id).then((response) => {
        editproduct = response;

        res.render("admin/edit-viewproduct", {
          layout: "adminLayout",
          editproduct,
          procategory,
          admins,
          adminlogin: true,
        });
      });
    });
  },

  //posteditaddproduct

  postAddEditProduct: async(req, res) => {

    let oldProductDetails = await adminProductHelpers.productImage(req.params.id);
    let oldImageArray = oldProductDetails.Image;
    let Editedimages = [];
    // console.log("oldImageArray",req.files.image1);
    if (req.files.image1) {
      Editedimages[0] = req.files.image1[0].filename;
    } else {
      Editedimages[0] = oldImageArray[0];
    }

    if (req.files.image2) {
      Editedimages[1] = req.files.image2[0].filename;
    } else {
      Editedimages[1] = oldImageArray[1];
    }

    if (req.files.image3) {
      Editedimages[2] = req.files.image3[0].filename;
    } else {
      Editedimages[2] = oldImageArray[2];
    }

    if (req.files.image4) {
      Editedimages[3] = req.files.image4[0].filename;
    } else {
      Editedimages[3] = oldImageArray[3];
    }


    adminProductHelpers
      .postEditProduct(req.params.id, req.body, Editedimages)
      .then((response) => {
        res.redirect("/admin/view_product");
      });
  },
};
