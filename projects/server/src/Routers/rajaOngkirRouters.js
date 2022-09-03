const { rajaOngkirControllers } = require('../Controllers');
const router = require('express').Router();

router.get('/getProvince', rajaOngkirControllers.getProvince);
router.get('/getCity', rajaOngkirControllers.getCity);

module.exports = router;