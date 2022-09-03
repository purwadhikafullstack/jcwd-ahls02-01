// const router = require('./userRouters');
const userRouters = require('./userRouters');
const rajaOngkirRouters = require('./rajaOngkirRouters')
const router = require('express').Router();

router.use("/users", userRouters);
router.use("/rajaOngkir", rajaOngkirRouters);

module.exports = router