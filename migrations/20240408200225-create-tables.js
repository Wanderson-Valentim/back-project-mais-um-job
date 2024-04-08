'use strict';

const User = require('../src/models/User');
const Local = require('../src/models/Local');
const AreaOfActivity = require('../src/models/AreaOfActivity');
const WorkImages = require('../src/models/WorkImages');

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await AreaOfActivity.sync();
      await Local.sync();
      await User.sync();
      await WorkImages.sync();
      console.log('Modelos sincronizados com o banco de dados.');
    } catch (err) {
      console.error('Erro ao sincronizar modelos com o banco de dados:', err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    // Não é necessário fazer nada na função de down nesta migração, pois não estamos revertendo as ações da função up.
  }
};
