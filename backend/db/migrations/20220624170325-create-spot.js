'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users'
        },
      },
      address: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(64)
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING(64)
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING(20)
      },
      country: {
        allowNull: false,
        type: Sequelize.STRING(64)
      },
      name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(64)
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Spots');
  }
};
