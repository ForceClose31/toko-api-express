const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');
const transactionController = require('../controllers/transactions');

router.post('/checkout', authenticateToken, transactionController.createTransaction);
router.post('/confirm-payment/:id', authenticateToken, transactionController.confirmPayment);
router.put('/update-status/:id', authenticateToken, authorizeAdmin, transactionController.updateTransactionStatus);
router.put('/update-shipment/:id', authenticateToken, authorizeAdmin, transactionController.updateShipmentStatus);

module.exports = router;
