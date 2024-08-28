const Product = require("../models/product");
const Store = require("../models/store");
const { Op } = require("sequelize");

const addProduct = async (req, res) => {
  const {
    name,
    price,
    stock,
    description,
    promotionStartDate,
    promotionEndDate,
  } = req.body;

  try {
    const store = await Store.findOne({ where: { adminId: req.user.id } });
    if (!store) {
      return res.status(400).json({ message: "Admin does not have a store" });
    }

    if (promotionStartDate && promotionEndDate) {
      const startDate = new Date(promotionStartDate);
      const endDate = new Date(promotionEndDate);
      const currentDate = new Date();

      if (startDate >= endDate) {
        return res
          .status(400)
          .json({
            message: "promotionStartDate must be before promotionEndDate",
          });
      }

      if (startDate < currentDate || endDate < currentDate) {
        return res
          .status(400)
          .json({ message: "Promotion dates must be in the future" });
      }
    }

    const newProduct = await Product.create({
      name,
      price,
      stock,
      description,
      storeId: store.id,
      promotionStartDate: promotionStartDate
        ? new Date(promotionStartDate)
        : null,
      promotionEndDate: promotionEndDate ? new Date(promotionEndDate) : null,
    });

    res.status(200).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    price,
    stock,
    description,
    promotionStartDate,
    promotionEndDate,
  } = req.body;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const store = await Store.findOne({ where: { adminId: req.user.id } });
    if (!store || product.storeId !== store.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this product" });
    }

    if (promotionStartDate && promotionEndDate) {
      const startDate = new Date(promotionStartDate);
      const endDate = new Date(promotionEndDate);
      const currentDate = new Date();

      if (startDate >= endDate) {
        return res
          .status(400)
          .json({
            message: "promotionStartDate must be before promotionEndDate",
          });
      }

      if (startDate < currentDate || endDate < currentDate) {
        return res
          .status(400)
          .json({ message: "Promotion dates must be in the future" });
      }
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.description = description || product.description;
    product.promotionStartDate = promotionStartDate
      ? new Date(promotionStartDate)
      : product.promotionStartDate;
    product.promotionEndDate = promotionEndDate
      ? new Date(promotionEndDate)
      : product.promotionEndDate;

    await product.save();

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const store = await Store.findOne({ where: { adminId: req.user.id } });
    if (!store || product.storeId !== store.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this product" });
    }

    await product.destroy();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getPromotionalProducts = async (req, res) => {
  const currentDate = new Date();

  try {
    const promotionalProducts = await Product.findAll({
      where: {
        promotionStartDate: {
          [Op.lte]: currentDate,
        },
        promotionEndDate: {
          [Op.gte]: currentDate,
        },
      },
    });

    res.status(200).json({ promotionalProducts });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getDiscountedProducts = async (req, res) => {
  try {
    const discountedProducts = await Product.findAll({
      where: {
        discount: {
          [Op.gt]: 0, // Products with a discount greater than 0
        },
      },
    });

    res.status(200).json(discountedProducts);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const addDiscount = async (req, res) => {
  const { id } = req.params;
  const { discount } = req.body;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const store = await Store.findOne({ where: { adminId: req.user.id } });
    if (!store || product.storeId !== store.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to add discount to this product" });
    }

    if (discount < 0 || discount > 100) {
      return res
        .status(400)
        .json({ message: "Discount must be between 0 and 100%" });
    }

    product.discount = discount;
    await product.save();

    res.status(200).json({ message: "Discount added successfully", product });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const removeDiscount = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const store = await Store.findOne({ where: { adminId: req.user.id } });
    if (!store || product.storeId !== store.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to remove discount from this product" });
    }

    product.discount = 0;
    await product.save();

    res.status(200).json({ message: "Discount removed successfully", product });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getPromotionalProducts,
  getDiscountedProducts,
  addDiscount,
  removeDiscount,
};
