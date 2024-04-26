const connection = require('../config/database');
const { DataTypes } = require('sequelize');
const Figurado = require('./Figurado');
const Palpite = require('./Palpite');
const User = require('./User');

const Chute = connection.define('Chute', {
    id: { 
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true   
    },
    resultado: {
      type: DataTypes.BOOLEAN,
    }
},{
  tableName: 'chutes'
});

Chute.belongsTo(Figurado, {foreignKey: 'chute_id', onUpdate: 'cascade', onDelete: 'CASCADE'});
Chute.belongsTo(Figurado, {foreignKey: 'figurado_id', onUpdate: 'cascade', onDelete: 'CASCADE'});
Chute.belongsTo(User, {foreignKey: 'user_id', onUpdate: 'cascade', onDelete: 'CASCADE'});

module.exports = Chute;
