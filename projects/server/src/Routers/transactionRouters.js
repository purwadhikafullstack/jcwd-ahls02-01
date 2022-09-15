const { readToken } = require('../Config/encription');
const { transactionControllers } = require('../Controllers');
const router = require('express').Router();

router.get('/userGetAllTransaction', readToken, transactionControllers.userGetAllTransaction);
router.post('/addNormalTransaction', readToken, transactionControllers.addNormalTransaction);
router.post('/addRecipeTransaction', readToken, transactionControllers.addRecipeTransaction);
router.patch('/addBuktiBayar', readToken, transactionControllers.addBuktiBayar);
router.get('/userGetValidasiResep', readToken, transactionControllers.userGetValidasiResep);
router.get('/userFilterValidasiResep', readToken, transactionControllers.userFilterValidasiResep);
router.get('/userGetMenungguPembayaran', readToken, transactionControllers.userGetMenungguPembayaran);
router.get('/userFilterMenungguPembayaran', readToken, transactionControllers.userFilterMenungguPembayaran);
router.get('/userGetMenungguKonfirmasi', readToken, transactionControllers.userGetMenungguKonfirmasi);
router.get('/userFilterMenungguKonfirmasi', readToken, transactionControllers.userFilterMenungguKonfirmasi);
router.get('/userGetDiproses', readToken, transactionControllers.userGetDiproses);
router.get('/userFilterDiproses', readToken, transactionControllers.userFilterDiproses);
router.get('/userGetDikirim', readToken, transactionControllers.userGetDikirim);
router.get('/userFilterDikirim', readToken, transactionControllers.userFilterDikirim);
router.get('/userGetPesananDikonfirmasi', readToken, transactionControllers.userGetPesananDikonfirmasi);
router.get('/userFilterPesananDikonfirmasi', readToken, transactionControllers.userFilterPesananDikonfirmasi);
router.get('/userGetDibatalkan', readToken, transactionControllers.userGetDibatalkan);
router.get('/userFilterDibatalkan', readToken, transactionControllers.userFilterDibatalkan);

router.get('/adminGetAllTransaction', readToken, transactionControllers.adminGetAllTransaction);




module.exports = router;