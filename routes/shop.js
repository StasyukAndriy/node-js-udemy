const path = require('path');

const express = require('express');
 
const shopController = require('../controllers/shop')

const router = express.Router();

router.get('/', shopController.getIndex);
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart)
router.get('/product-list', shopController.showProducts);
router.get('/checkout', shopController.getCheckout);
router.get('/product-list/:id', shopController.getProduct)
module.exports = router;
