const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');
const productController = require('../controllers/products');

router.post('/add', authenticateToken, authorizeAdmin, productController.addProduct);

module.exports = router;
