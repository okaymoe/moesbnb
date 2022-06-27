'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define('Spot', {
    userId: {
      type:DataTypes.INTEGER,
      allowNull: false
     },
     address: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 50]
      },
     },
     city: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      },
     },
    state: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      },
     },
    country: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50]
      },
     },
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 150]
      },
     },
    price: {
      type:DataTypes.NUMERIC,
      allowNull: false
     },
  }, {});
  Spot.associate = function(models) {
    Spot.belongsTo(models.User, { foreignKey: 'userId' })
    Spot.hasMany(models.Image, { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true })
  };
  return Spot;
};