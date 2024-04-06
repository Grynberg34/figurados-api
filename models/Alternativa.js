const connection = require('../config/database');
const { DataTypes } = require('sequelize');
const Figurinha = require('./Figurinha');

const Alternativa = connection.define('Alternativa', {
    id: { 
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true   
    },
    nome_alternativo: { 
      type: DataTypes.STRING,
      unique: true,
    },
},{
  tableName: 'certos'
});

Alternativa.belongsTo(Figurinha, {foreignKey: 'figurinha_id', onUpdate: 'cascade', onDelete: 'CASCADE'});

module.exports = Alternativa;
