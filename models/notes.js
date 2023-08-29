'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notes extends Model {
    static associate(models) {
      Notes.belongsTo(models.Users, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      })
    }
  }
  Notes.init({
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    category: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Notes',
  });
  return Notes;
};