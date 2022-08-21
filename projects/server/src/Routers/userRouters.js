const { readToken } = require('../Config/encription');
const { userControllers } = require('../Controllers');
const router = require('express').Router();

router.post('/register', userControllers.register);
router.patch('/verified', readToken, userControllers.verified);
router.get('/keepLogin', readToken, userControllers.keepLogin);

module.exports = router;