const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

// Define Recipe model
const Recipe = sequelize.define('Recipe', {
    section: Sequelize.STRING,
    name: Sequelize.STRING,
    nutrition: Sequelize.JSON,
    instructions: Sequelize.JSON,
    thumbnail: Sequelize.STRING,
    //the dataset has more we can pull from it and save for future featurestm
});

module.exports = Recipe; // Export the Recipe model for use in other modules