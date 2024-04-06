const connection = require('../config/database');
const { DataTypes } = require('sequelize');
const Figurinha = require('./Figurinha');
const Palpite = require('./Palpite');

const PalpiteCerto = connection.define('PalpiteCerto', {
    id: { 
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true   
    },
},{
  tableName: 'palpites_certos'
});

PalpiteCerto.belongsTo(Figurinha, {foreignKey: 'figurinha_id', onUpdate: 'cascade', onDelete: 'CASCADE'});
PalpiteCerto.belongsTo(Palpite, {foreignKey: 'palpite_id', onUpdate: 'cascade', onDelete: 'CASCADE'});


module.exports = PalpiteCerto;
