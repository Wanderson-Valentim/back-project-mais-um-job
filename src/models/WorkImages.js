const { DataTypes } = require('sequelize');
const sequelize = require("../db");
const User = require('./User');

const WorkImages = sequelize.define('work_images', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  src: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  
});

module.exports = WorkImages