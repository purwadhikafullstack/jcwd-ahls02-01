const router = require('./userRouters');
const userRouters = require('./userRouters');
const routers = require('express').Router();

router.use("/users", userRouters);

module.exports = router