const Product = require('../models/product');
const Store = require('../models/store');

const addProduct = async (req, res) => {
  const { name, price, stock, description } = req.body;

  try {
    const store = await Store.findOne({ where: { adminId: req.user.id } });
    if (!store) {
      return res.status(400).json({ message: 'Admin does not have a store' });
    }

    const newProduct = await Product.create({
      name,
      price,
      stock,
      description,
      storeId: store.id,
    });

    res.status(200).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, stock, description } = req.body;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const store = await Store.findOne({ where: { adminId: req.user.id } });
    if (!store || product.storeId !== store.id) {
      return res.status(403).json({ message: 'Unauthorized to update this product' });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.description = description || product.description;

    await product.save();

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const store = await Store.findOne({ where: { adminId: req.user.id } });
    if (!store || product.storeId !== store.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this product' });
    }

    await product.destroy();

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
};
