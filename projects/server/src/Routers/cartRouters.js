const { readToken } = require('../Config/encription');
const { cartControllers } = require('../Controllers');
const router = require('express').Router();

router.get('/getAllCart', readToken, cartControllers.getAllCart);
router.post('/add', readToken, cartControllers.add);
router.patch('/:idCart', readToken, cartControllers.edit);
router.patch('/:idCart', readToken, cartControllers.delete);
router.post('/checkout', readToken, cartControllers.checkout);
router.post('/returnStock', readToken, cartControllers.returnStock);
router.get('/getAllMainStock', cartControllers.getAllMainStock);

module.exports = router;