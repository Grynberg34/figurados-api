const connection = require('../config/database');
const { DataTypes } = require('sequelize');
const Figurado = require('./Figurado');
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

PalpiteCerto.belongsTo(Figurado, {foreignKey: 'figurado_id', onUpdate: 'cascade', onDelete: 'CASCADE'});
PalpiteCerto.belongsTo(Palpite, {foreignKey: 'palpite_id', onUpdate: 'cascade', onDelete: 'CASCADE'});


module.exports = PalpiteCerto;
