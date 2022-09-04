const userRouters = require('./userRouters');
const addresRouters = require('./addressRouters')
const rajaOngkirRouters = require('./rajaOngkirRouters')
const router = require('express').Router();

router.use("/users", userRouters);
router.use("/address", addresRouters);
router.use("/rajaOngkir", rajaOngkirRouters);

module.exports = router