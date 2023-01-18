
const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin')


// /admin/add-product => GET
router.get('/add-product', adminController.showAddProduct);

// /admin/add-product => POST
router.post('/add-product', adminController.postNewProduct);

router.get('/products', adminController.getProductsAdmin)
router.get('/edit/:id', adminController.getEditProduct)
router.post('/edit', adminController.postEditProduct)
router.get('/delete/:id', adminController.deleteProduct)



module.exports = router;

