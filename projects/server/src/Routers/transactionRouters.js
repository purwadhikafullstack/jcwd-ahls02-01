const { readToken } = require('../Config/encription');
const { transactionControllers } = require('../Controllers');
const router = require('express').Router();

router.get('/userGetAllTransaction', readToken, transactionControllers.userGetAllTransaction);
router.post('/addNormalTransaction', readToken, transactionControllers.addNormalTransaction);
router.post('/addRecipeTransaction', readToken, transactionControllers.addRecipeTransaction);
router.patch('/addBuktiBayar', readToken, transactionControllers.addBuktiBayar);

router.get('/adminGetAllTransaction', readToken, transactionControllers.adminGetAllTransaction);


// router.get('/userGetValidasiResep', readToken, transactionControllers.userGetValidasiResep);
// router.get('/userGetMenungguPembayaran', readToken, transactionControllers.userGetMenungguPembayaran);
// router.get('/userGetMenungguKonfirmasi', readToken, transactionControllers.userGetMenungguKonfirmasi);


module.exports = router;