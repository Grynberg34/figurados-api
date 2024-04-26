const connection = require('../config/database');
const { DataTypes } = require('sequelize');
const Figurado = require('./Figurado');
const Palpite = require('./Palpite');
const User = require('./User');

const PalpiteUser = connection.define('PalpiteUser', {
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
  tableName: 'palpites_user'
});

PalpiteUser.belongsTo(Figurado, {foreignKey: 'figurado_id', onUpdate: 'cascade', onDelete: 'CASCADE'});
PalpiteUser.belongsTo(Palpite, {foreignKey: 'palpite_id', onUpdate: 'cascade', onDelete: 'CASCADE'});
PalpiteUser.belongsTo(User, {foreignKey: 'user_id', onUpdate: 'cascade', onDelete: 'CASCADE'});

module.exports = PalpiteUser;
