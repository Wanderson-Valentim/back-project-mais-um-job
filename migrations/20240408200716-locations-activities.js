'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('locations', [
      { name: 'Juazeiro do Norte', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Barbalha', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Crato', createdAt: new Date(), updatedAt: new Date() },
    ]);

    await queryInterface.bulkInsert('area_of_activities', [
      { name: 'Saúde', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Construção Civil', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Tecnologia da Informação', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('locations', null, {});

    await queryInterface.bulkDelete('area_of_activities', null, {});
  }
};
