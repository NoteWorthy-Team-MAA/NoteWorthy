'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prefs extends Model {
    static associate(models) {
      Prefs.belongsTo(models.Users, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      })
    }
  }
  Prefs.init({
    theme: DataTypes.STRING,
    autoSave: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Prefs',
  });
  return Prefs;
};