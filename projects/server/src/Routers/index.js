const userRouters = require("./userRouters");
const adminRouters = require("./adminRouters");
const addresRouters = require('./addressRouters')
const rajaOngkirRouters = require('./rajaOngkirRouters')

const router = require('express').Router();

router.use("/users", userRouters);
router.use("/address", addresRouters);
router.use("/admin", adminRouters);
router.use("/rajaOngkir", rajaOngkirRouters);

module.exports = router