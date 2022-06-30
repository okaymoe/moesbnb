'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

   return queryInterface.bulkInsert('Reviews', [
     {
     comment: 'I was here last week, best time of my life!',
     userId: 1,
     spotId: 1,
     rating: 4,
   },
     {
     comment: 'I wish I could afford staying here...',
     userId: 1,
     spotId: 1,
     rating: 5,
   },
     {
     comment: 'My dog loved the backyard!',
     userId: 1,
     spotId: 1,
     rating: 5,
   }
  ], {});
  },

  down: (queryInterface, Sequelize) => {

   return queryInterface.bulkDelete('Reviews', null, {});
  }
};
