const { readToken } = require('../Config/encription');
const { transactionControllers } = require('../Controllers');
const { adminEditTransactionStatusOnly } = require('../Controllers/transactionControllers');
const router = require('express').Router();

//* USER GET ALL TRANSACTIONS
router.get('/userGetAllTransaction', readToken, transactionControllers.userGetAllTransaction);

//* ADD NORMAL, RECIPE TRANSACTIONS, UPLOAD BUKTI BAYAR
router.post('/addNormalTransaction', readToken, transactionControllers.addNormalTransaction);
router.post('/addRecipeTransaction', readToken, transactionControllers.addRecipeTransaction);
router.patch('/addBuktiBayar', readToken, transactionControllers.addBuktiBayar);

//* USER GET PAGINATED PAGE, FILTER, SORT TRANSACTIONS
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

//* ADMIN GET PAGINATED PAGE, FILTER, SORTIR TRANSACTIONS
router.get('/adminGetAllTransaction', readToken, transactionControllers.adminGetAllTransaction);
router.get('/adminGetValidasiResep', readToken, transactionControllers.adminGetValidasiResep);
router.get('/adminFilterValidasiResep', readToken, transactionControllers.adminFilterValidasiResep);
router.get('/adminGetMenungguPembayaran', readToken, transactionControllers.adminGetMenungguPembayaran);
router.get('/adminFilterMenungguPembayaran', readToken, transactionControllers.adminFilterMenungguPembayaran);
router.get('/adminGetMenungguKonfirmasi', readToken, transactionControllers.adminGetMenungguKonfirmasi);
router.get('/adminFilterMenungguKonfirmasi', readToken, transactionControllers.adminFilterMenungguKonfirmasi);
router.get('/adminGetDiproses', readToken, transactionControllers.adminGetDiproses);
router.get('/adminFilterDiproses', readToken, transactionControllers.adminFilterDiproses);
router.get('/adminGetDikirim', readToken, transactionControllers.adminGetDikirim);
router.get('/adminFilterDikirim', readToken, transactionControllers.adminFilterDikirim);
router.get('/adminGetPesananDikonfirmasi', readToken, transactionControllers.adminGetPesananDikonfirmasi);
router.get('/adminFilterPesananDikonfirmasi', readToken, transactionControllers.adminFilterPesananDikonfirmasi);
router.get('/adminGetDibatalkan', readToken, transactionControllers.adminGetDiproses);
router.get('/adminFilterDibatalkan', readToken, transactionControllers.adminFilterDiproses);

//* RECIPE VALIDATION PROSES
router.get('/adminGetDetailRecipe', readToken, transactionControllers.adminGetDetailRecipe);
router.get('/adminGetAllProduct', transactionControllers.adminGetAllProduct);
router.post('/adminAddTransactionDetailForRecipe', transactionControllers.adminAddTransactionDetailForRecipe);

//* UPDATE TRANSACTION STATUS WITHOUT IMPACTING PRODUCT HISTORY TABEL
router.patch('/adminEditTransactionStatusOnly/:id', readToken, transactionControllers.adminEditTransactionStatusOnly);



module.exports = router;