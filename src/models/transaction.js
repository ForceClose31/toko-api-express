const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./product');
const User = require('./user');

const Transaction = sequelize.define('Transaction', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Products',
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'shipped', 'paid'),
    defaultValue: 'pending',
  },
}, {
  timestamps: true, 
});

Transaction.belongsTo(User, { foreignKey: 'userId' });
Transaction.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Transaction;
