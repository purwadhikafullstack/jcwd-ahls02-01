const { rajaOngkirControllers } = require('../Controllers');
const router = require('express').Router();

router.get('/getProvince', rajaOngkirControllers.getProvince);
router.get('/getProvince2', rajaOngkirControllers.getProvince2);
router.get('/getCity', rajaOngkirControllers.getCity);
router.get('/getCity2', rajaOngkirControllers.getCity2);

module.exports = router;