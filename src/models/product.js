const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Store = require('./store');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Product.belongsTo(Store, {
  foreignKey: 'storeId',
  as: 'store',
});

module.exports = Product;
