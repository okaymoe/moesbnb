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
    {
      userId: 2,
      address: '18 Josa St.',
      city: 'Wayne',
      state: 'New Jersey',
      country: 'USA',
      name: 'GETAWAY!',
      price: 95,
    },
    {
      userId: 3,
      address: '16 Family St',
      city: 'Miami',
      state: 'Florida',
      country: 'USA',
      name: 'Water Views',
      price: 630,
    },
   ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Spots', null, {});
  }
};
