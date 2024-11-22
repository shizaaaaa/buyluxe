const express = require('express');
const router = express.Router();
const { addProduct, getProducts } = require('../controller/ProductController');

router.post('/add/product', addProduct);

router.get('/products', getProducts);

module.exports = router;
