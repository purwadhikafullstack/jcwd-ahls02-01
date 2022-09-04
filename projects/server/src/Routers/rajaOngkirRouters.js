const { rajaOngkirControllers } = require('../Controllers');
const router = require('express').Router();

router.get('/getProvince', rajaOngkirControllers.getProvince);
router.get('/getProvince2', rajaOngkirControllers.getProvince2);
router.get('/getCity', rajaOngkirControllers.getCity);

module.exports = router;