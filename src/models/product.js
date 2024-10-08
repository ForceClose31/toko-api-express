const { DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize;

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  discount: {
    type: DataTypes.FLOAT, 
    allowNull: true,
  },
  promotionStartDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  promotionEndDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = Product;
