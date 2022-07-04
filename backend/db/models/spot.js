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
        len: [2, 25]
      },
     },
     city: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 25]
      },
     },
    state: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 25]
      },
     },
    country: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 25]
      },
     },
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 25]
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
    Spot.hasMany(models.Review, { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true })
  };
  return Spot;
};