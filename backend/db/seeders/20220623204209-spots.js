'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Spots', [
    {
      userId: 1,
      address: '1000 Main St.',
      city: 'New York',
      state: 'New York',
      country: 'USA',
      name: 'Hamptons Retreat',
      price: 220,
    },
   ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Spots', null, {});
  }
};
