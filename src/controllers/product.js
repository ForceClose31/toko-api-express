const Product = require('../models/product');
const Store = require('../models/store');

const addProduct = async (req, res) => {
  const { name, price, description } = req.body;

  try {
    const store = await Store.findOne({ where: { adminId: req.user.id } });
    if (!store) {
      return res.status(400).json({ message: 'Admin does not have a store' });
    }

    const newProduct = await Product.create({
      name,
      price,
      description,
      storeId: store.id,
    });

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  addProduct,
};
