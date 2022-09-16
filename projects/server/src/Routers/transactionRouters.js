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
router.get('/adminGetValidasiResep', readToken, transactionControllers.adminGetValidasiResep);
router.get('/adminFilterValidasiResep', readToken, transactionControllers.adminFilterValidasiResep);
router.get('/adminGetMenungguPembayaran', readToken, transactionControllers.adminGetMenungguPembayaran);
router.get('/adminFilterMenungguPembayaran', readToken, transactionControllers.adminFilterMenungguPembayaran);
router.get('/adminGetMenungguKonfirmasi', readToken, transactionControllers.adminGetMenungguKonfirmasi);
router.get('/adminFilterMenungguKonfirmasi', readToken, transactionControllers.adminFilterMenungguKonfirmasi);
router.get('/adminGetDiproses', readToken, transactionControllers.adminGetDiproses);
router.get('/adminFilterDiproses', readToken, transactionControllers.adminFilterDiproses);
router.get('/adminGetDikirim', readToken, transactionControllers.adminGetDiproses);
router.get('/adminFilterDikirim', readToken, transactionControllers.adminFilterDiproses);
router.get('/adminGetPesananDikonfirmasi', readToken, transactionControllers.adminGetDiproses);
router.get('/adminFilterPesananDikonfirmasi', readToken, transactionControllers.adminFilterDiproses);
router.get('/adminGetDibatalkan', readToken, transactionControllers.adminGetDiproses);
router.get('/adminFilterDibatalkan', readToken, transactionControllers.adminFilterDiproses);

router.get('/adminGetDetailRecipe', readToken, transactionControllers.adminGetDetailRecipe);
router.get('/adminGetAllProduct', transactionControllers.adminGetAllProduct);
router.post('/adminAddTransactionDetailForRecipe', transactionControllers.adminAddTransactionDetailForRecipe);

module.exports = router;