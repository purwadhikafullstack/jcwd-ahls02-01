const { readToken } = require('../Config/encription');
const { userControllers } = require('../Controllers');
const router = require('express').Router();

// router.get('/', userController.get);
// router.get('/filter', readToken, userController.getFilter);
router.post('/', userControllers.register);
// router.post('/login', userController.login);
// router.post('/forgot', userController.forgot);
// router.patch('/', readToken, userController.edit);
// router.patch('/fotoprof', readToken, userController.fotoprof);
// router.get('/keep', readToken, userController.keepLogin);
// router.patch('/verified', readToken, userController.verifiedAccount);
// router.get('/reverified', readToken, userController.reVerified);
// router.patch('/resetpass', readToken, userController.resetPass);
// router.delete('/', userController.deleteTokens);
// router.post('/getTokens', readToken, userController.getTokens);

module.exports = router;