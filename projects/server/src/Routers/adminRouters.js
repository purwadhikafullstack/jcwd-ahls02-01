const { readToken } = require("../Config/encription");
const router = require("express").Router();
const AdminController = require("../Controllers/adminControllers");

router.get("/dataproduct", AdminController.getDataProduct);
router.delete("/deleteproduct/:id", readToken, AdminController.deleteProduct);
router.post("/addproduct", readToken, AdminController.addProduct);
router.patch("/editproduct", readToken, AdminController.editProduct);
router.post("/createcategory", readToken, AdminController.createCategory);
router.patch("/updatecategory", readToken, AdminController.updateCategory);
router.post("/deletecategory", readToken, AdminController.deleteCategory);
router.get("/getunitdata", readToken, AdminController.getAvailableUnit);
router.post("/convertunit", readToken, AdminController.getConverstionUnit);
router.get("/getcategory", readToken, AdminController.getCategoryList);


module.exports = router;
