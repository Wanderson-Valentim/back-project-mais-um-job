const { DataTypes } = require('sequelize');
const sequelize = require("../db")

const Local = sequelize.define('locations', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  
});

module.exports = Local