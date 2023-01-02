
const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin')


// /admin/add-product => GET
router.get('/add-product', adminController.showAddProduct);

// /admin/add-product => POST
router.post('/add-product', adminController.postNewProduct);

router.get('/products', adminController.getProductsAdmin)

router.get('/delete/:id', adminController.deleteProduct)
router.get('/edit/:id', adminController.getEditProduct)
// router.post('/edit', adminController.postEditProduct)

module.exports = router;

