const { DataTypes } = require('sequelize');
const sequelize = require("../db")

const AreaOfActivity = sequelize.define('area_of_activities', {
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

module.exports = AreaOfActivity