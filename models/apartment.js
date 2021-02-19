'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class apartment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    models.apartment.belongsTo(models.resident)
    models.apartment.hasMany(models.review)
    }
  };
  apartment.init({
    name: DataTypes.STRING,
    bedrooms: DataTypes.INTEGER,
    bathrooms: DataTypes.INTEGER,
    residentId: DataTypes.INTEGER
   }, {
    sequelize,
    modelName: 'apartment',
  });
  return apartment;
};