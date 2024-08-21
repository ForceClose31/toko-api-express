const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./user');

const Store = sequelize.define('Store', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Store.belongsTo(User, {
  foreignKey: 'adminId',
  as: 'admin',
});

User.hasOne(Store, {
  foreignKey: 'adminId',
  as: 'store',
});

module.exports = Store;
