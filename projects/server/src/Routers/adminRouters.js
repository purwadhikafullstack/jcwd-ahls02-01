const { readToken } = require('../Config/encription');
const router = require('express').Router();
const AdminController = require('../Controllers/adminControllers')

router.get('/dataproduct', readToken, AdminController.getDataProduct);
router.delete('/deleteproduct/:id', readToken, AdminController.deleteProduct);
router.get('/getprodukID', readToken, AdminController.getUnikIDProduct);
router.get('/paginate', readToken, AdminController.pagination);
router.post('/addproduct', readToken, AdminController.addProduct);
router.patch('/editproduct', readToken, AdminController.editProduct);

module.exports = router;