const Transaction = require('../models/transaction');
const TransactionItem = require('../models/transactionItem');
const Product = require('../models/product');

const createTransaction = async (req, res) => {
    const { items } = req.body; 

    try {
        let totalAmount = 0;

        for (let item of items) {
            const product = await Product.findByPk(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Not enough stock for product ${product.name}` });
            }

            totalAmount += product.price * item.quantity;
        }

        const transaction = await Transaction.create({
            userId: req.user.id,
            totalAmount
        });

        for (let item of items) {
            const product = await Product.findByPk(item.productId);

            product.stock -= item.quantity;
            await product.save();

            await TransactionItem.create({
                transactionId: transaction.id,
                productId: item.productId,
                quantity: item.quantity,
                price: product.price
            });
        }

        res.status(200).json({ message: 'Transaction created successfully', transactionId: transaction.id });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const updateTransactionStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // 'accepted' or 'rejected'

    try {
        const transaction = await Transaction.findByPk(id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        transaction.status = status;
        await transaction.save();

        res.status(200).json({ message: `Transaction ${status} successfully` });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const confirmPayment = async (req, res) => {
    const { id } = req.params;

    try {
        const transaction = await Transaction.findByPk(id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        if (transaction.paymentStatus === 'paid') {
            return res.status(400).json({ message: 'Payment already confirmed' });
        }

        transaction.paymentStatus = 'paid';
        await transaction.save();

        res.status(200).json({ message: 'Payment confirmed successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const updateShipmentStatus = async (req, res) => {
    const { id } = req.params;

    try {
        const transaction = await Transaction.findByPk(id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        if (transaction.paymentStatus !== 'paid') {
            return res.status(400).json({ message: 'Cannot ship without payment' });
        }

        transaction.status = 'shipped';
        await transaction.save();

        res.status(200).json({ message: 'Shipment status updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = {
    createTransaction,
    updateTransactionStatus,
    confirmPayment,
    updateShipmentStatus
};
