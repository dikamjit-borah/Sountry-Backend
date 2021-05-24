'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notes_table extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  notes_table.init({
    note_title: DataTypes.STRING,
    note_description: DataTypes.STRING,
    created_by: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'notes_table',
  });
  return notes_table;
};