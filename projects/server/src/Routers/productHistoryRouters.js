const { readToken } = require('../Config/encription');
const { productHistoryControllers } = require('../Controllers');
const router = require('express').Router();

router.get('/getProdukHistory', readToken, productHistoryControllers.getProdukHistory);
router.get('/getProdukHistoryTanggalASC', readToken, productHistoryControllers.getProdukHistoryTanggalASC);
router.get('/getProdukHistoryTanggalDSC', readToken, productHistoryControllers.getProdukHistoryTanggalDSC);
router.post('/getSearchProdukHistory', readToken, productHistoryControllers.getSearchProdukHistory);
router.post('/getFilterProdukHistory', readToken, productHistoryControllers.getFilterProdukHistory);

module.exports = router;