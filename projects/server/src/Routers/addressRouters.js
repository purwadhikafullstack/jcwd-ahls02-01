const { readToken } = require('../Config/encription');
const { addressControllers } = require('../Controllers');
const router = require('express').Router();

router.get('/getAddress', readToken, addressControllers.getAddress);
router.post('/addAddress', readToken, addressControllers.addAddress);
router.patch('/editAddress', readToken, addressControllers.editAddress);
router.post('/deleteAddress', readToken, addressControllers.deleteAddress);

module.exports = router;