'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Images', [
      {
        spotId: 1,
        url: 'https://photos.zillowstatic.com/fp/cff43bfb0f006788f83e7c2542a6d84d-uncropped_scaled_within_1536_1152.webp'
      },
      {
        spotId: 1,
        url: ''
      },
      {
        spotId: 1,
        url: ''
      },
      {
        spotId: 1,
        url: ''
      },
      {
        spotId: 1,
        url: ''
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, {});
  }
};
