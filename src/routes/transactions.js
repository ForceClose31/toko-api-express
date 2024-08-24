const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');
const transactionController = require('../controllers/transactions');

router.post('/checkout', authenticateToken, transactionController.checkout);
router.put('/accept/:id', authenticateToken, authorizeAdmin, transactionController.acceptTransaction);
router.put('/pay/:id', authenticateToken, transactionController.makePayment);
router.put('/ship/:id', authenticateToken, authorizeAdmin, transactionController.markAsShipped);

module.exports = router;
