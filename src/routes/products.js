const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');
const productController = require('../controllers/products');

router.post('/add', authenticateToken, authorizeAdmin, productController.addProduct);
router.put('/update/:id', authenticateToken, authorizeAdmin, productController.updateProduct);
router.delete('/delete/:id', authenticateToken, authorizeAdmin, productController.deleteProduct);
router.get('/all', authenticateToken, productController.getAllProducts);
router.get('/:id', authenticateToken, productController.getProductById);
router.get('/promotions', authenticateToken, productController.getPromotionalProducts);
router.post('/discount/:id', authenticateToken, authorizeAdmin, productController.addDiscount);
router.delete('/discount/:id', authenticateToken, authorizeAdmin, productController.removeDiscount);

module.exports = router;
