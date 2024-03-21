const { Sequelize } = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize({ 
  database: process.env.DB_DATABASE, 
  username: process.env.DB_USERNAME, 
  password: process.env.DB_PASSWORD, 
  dialect: 'mysql' 
});

module.exports = sequelize;