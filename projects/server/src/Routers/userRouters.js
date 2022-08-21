const { readToken } = require('../Config/encription');
const { userControllers } = require('../Controllers');
const router = require('express').Router();

router.post('/register', userControllers.register);

module.exports = router;