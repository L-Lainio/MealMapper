const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a database configuration file

const MealPlan = sequelize.define('MealPlan', {
  sunday: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  monday: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  tuesday: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  wednesday: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  thursday: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  friday: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  saturday: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

module.exports = MealPlan;
