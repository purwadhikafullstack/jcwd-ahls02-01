const userRouters = require("./userRouters");
const adminRouters = require("./adminRouters");
const router = require("express").Router();


router.use("/users",userRouters);
router.use("/admin",adminRouters)


module.exports = router