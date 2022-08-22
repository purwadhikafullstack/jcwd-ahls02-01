const { readToken } = require('../Config/encription');
const { userControllers } = require('../Controllers');
const router = require('express').Router();

router.post('/register', userControllers.register);
router.get('/keepLogin', readToken, userControllers.keepLogin);
router.patch('/verified', readToken, userControllers.verified);
router.get('/reverified', readToken, userControllers.reverified);
router.post('/login', userControllers.login);

module.exports = router;