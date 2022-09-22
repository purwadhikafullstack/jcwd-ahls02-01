const { readToken } = require("../Config/encription");
const { userControllers } = require("../Controllers");
const router = require("express").Router();

router.post('/register', userControllers.register);
router.get('/keepLogin', readToken, userControllers.keepLogin);
router.patch('/verified', readToken, userControllers.verified);
router.get('/reverified', readToken, userControllers.reverified);
router.post('/getTokens', readToken, userControllers.getTokens);
router.post('/login', userControllers.login);
router.patch('/change', readToken, userControllers.change);
router.post('/forgot', userControllers.forgot);
router.patch('/reset', readToken, userControllers.reset);
router.patch('/edit', readToken, userControllers.edit);
router.patch('/profilePicture', readToken, userControllers.profilePicture);
router.post("/getproducts", userControllers.getProducts);
router.get(
  "/getproductdetail/:id",
  
  userControllers.getproductDetail
);
router.get("/getCategoryList",userControllers.getCategoryList);

module.exports = router;
