const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Transaction = require('./transaction');
const Product = require('./product');

const TransactionItem = sequelize.define('TransactionItem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    transactionId: {
        type: DataTypes.INTEGER,
        references: {
            model: Transaction,
            key: 'id'
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

module.exports = TransactionItem;
