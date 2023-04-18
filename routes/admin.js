var express = require("express");
const admincontroller = require("../controllers/admincontroller/adminlogin");
const adminviewuser = require("../controllers/admincontroller/adminviewuser");
const Category = require("../controllers/admincontroller/Category");
const adminCartegoryHelpers = require("../helpers/adminHelpers/adminCartegoryHelpers");
const admincategory = require("../controllers/admincontroller/Category");
const adminproduct = require("../controllers/admincontroller/product")
const adminbanner= require("../controllers/admincontroller/bannercontroll")
var router = express.Router();
const multer= require('multer');
const upload=require('../multer/multer')
const auths = require("../middlewares/middleware");


/********************admin login routes********************/
router.get("/",auths.auth,admincontroller.getDashboard);

router.get("/login",auths.auth,admincontroller.getAdminLogin);

router.post("/login", admincontroller.postAdminLogin);

router.get("/logout",admincontroller.getAdminLogOut);



/********************admin user routes********************/

router.get("/view-users",auths.auth,adminviewuser.getViewUser);

router.get("/block_users/:id",auths.auth,adminviewuser.getBlockUser);

router.get("/unblock_users/:id",auths.auth,adminviewuser.getUnblockUser);



/********************admin category routes********************/
router.get("/add_category",auths.auth,admincategory.getCategory);

router.post("/add_category", admincategory.postCategory);

// router.get("/delete_category/:id",auths.auth,admincategory.deleteCategory) 

router.get("/list-category/:id",admincategory. listCategory)

router.get("/unlist-category/:id",admincategory. unlistCategory)

router.get("/edit_category/:id",auths.auth,admincategory.editCategory)

router.post("/edit_category/:id",admincategory.postEditCategory)



/********************admin product routes********************/

router.get("/add_product",auths.auth,adminproduct.getAddProduct)

router.post("/add_product",upload.uploads,adminproduct.postAddProduct)

router.get("/view_product",auths.auth,adminproduct.getViewproduct)

router.get("/block_product/:id",adminproduct.blockproduct)

router.get("/unblock_product/:id",adminproduct.unblockproduct)
 
router.get("/edit_product/:id",auths.auth,adminproduct.editViewProduct)

router.post("/edit_product/:id",upload.editeduploads,adminproduct.postAddEditProduct)


/********************admin banner routes********************/

router.get("/banner",auths.auth,upload.addBannerupload,adminbanner.getbanner)

router.post("/banner",upload.addBannerupload,adminbanner.postbanner)

router.get("/editbanner/:id",adminbanner.geteditbanner)

router.post("/editbanner/:id",adminbanner.posteditbanner)

// router.get("/block_banner/:id",adminbanner.blockbanner)

// router.get("/unblock_banner/:id",adminbanner.unblockbanner)
 



module.exports = router;
