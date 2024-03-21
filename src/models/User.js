const { DataTypes } = require('sequelize');
const sequelize = require("../db");
const AreaOfActivity = require('./AreaOfActivity');
const Local = require('./Local');
const WorkImages = require('./WorkImages');

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  whatsapp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  instagram: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  profession: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profileImageId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  
});

User.belongsTo(Local, { foreignKey: 'localId' });
User.belongsTo(AreaOfActivity, { foreignKey: 'areaOfActivityId' });
User.hasMany(WorkImages);

module.exports = User