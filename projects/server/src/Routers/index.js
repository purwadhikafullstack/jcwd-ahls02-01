const userRouters = require("./userRouters");
const adminRouters = require("./adminRouters");
const addresRouters = require('./addressRouters');
const rajaOngkirRouters = require('./rajaOngkirRouters');
const cartRouters = require('./cartRouters');
const transactionRouters = require('./transactionRouters');
const salesReportRouters = require('./salesReportRouters');
const productHistoryRouters = require('./productHistoryRouters')

const router = require('express').Router();

router.use("/users", userRouters);
router.use("/address", addresRouters);
router.use("/admin", adminRouters);
router.use("/rajaOngkir", rajaOngkirRouters);
router.use("/cart", cartRouters);
router.use("/transaction", transactionRouters);
router.use("/salesReport", salesReportRouters);
router.use("/productHistory", productHistoryRouters);

module.exports = router;
