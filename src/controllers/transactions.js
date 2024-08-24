const Transaction = require('../models/transaction');
const Product = require('../models/product');

const checkout = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const totalPrice = product.price * quantity;

    const transaction = await Transaction.create({
      userId,
      productId,
      quantity,
      totalPrice,
    });

    res.status(200).json({ message: 'Transaction created successfully', transaction });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const acceptTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    if (transaction.status !== 'pending') {
      return res.status(400).json({ message: 'Transaction is not in pending status' });
    }

    transaction.status = 'accepted';
    await transaction.save();

    res.status(200).json({ message: 'Transaction accepted', transaction });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const makePayment = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    if (transaction.status !== 'accepted') {
      return res.status(400).json({ message: 'Transaction must be accepted first' });
    }

    transaction.status = 'paid';
    await transaction.save();

    res.status(200).json({ message: 'Payment successful', transaction });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Admin Mark as Shipped
const markAsShipped = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    if (transaction.status !== 'paid') {
      return res.status(400).json({ message: 'Payment must be completed first' });
    }

    transaction.status = 'shipped';
    await transaction.save();

    res.status(200).json({ message: 'Product marked as shipped', transaction });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  checkout,
  acceptTransaction,
  makePayment,
  markAsShipped,
};
