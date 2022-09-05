const userRouters = require('./userRouters');

const router = require('express').Router();

router.use("/users", userRouters);

module.exports = router

// module.exports = {
//   userRouters
// }