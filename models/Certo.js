const connection = require('../config/database');
const { DataTypes } = require('sequelize');
const Figurinha = require('./Figurinha');
const Palpite = require('./Palpite');

const Certo = connection.define('Certo', {
    id: { 
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true   
    },
},{
  tableName: 'certos'
});

Certo.belongsTo(Figurinha, {foreignKey: 'figurinha_id', onUpdate: 'cascade', onDelete: 'CASCADE'});
Certo.belongsTo(Palpite, {foreignKey: 'palpite_id', onUpdate: 'cascade', onDelete: 'CASCADE'});


module.exports = Certo;
