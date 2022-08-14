'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    spotId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Spots'
      },
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users'
      },
    },
    startDate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    endDate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    cost: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {});
  Booking.associate = function(models) {
    Booking.belongsTo(models.Spot, {
      foreignKey: 'spotId'
    });
    Booking.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };
  return Booking;
};
