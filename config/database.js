// config/database.js
const { Sequelize } = require('sequelize');

// Replace 'your-database', 'your-username', 'your-password', and 'your-host' with your PostgreSQL database credentials
const sequelize = new Sequelize('mealmapper_db', 'postgres', 'rootroot', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;
