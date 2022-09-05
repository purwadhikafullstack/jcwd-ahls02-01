const userRouters = require("./userRouters");
const adminRouters = require("./adminRouters");
const addresRouters = require('./addressRouters');
const rajaOngkirRouters = require('./rajaOngkirRouters');
const cartRouters = require('./cartRouters');
const router = require('express').Router();

router.use("/users", userRouters);
router.use("/address", addresRouters);
router.use("/admin", adminRouters);
router.use("/rajaOngkir", rajaOngkirRouters);
router.use("/cart", cartRouters);

module.exports = router;