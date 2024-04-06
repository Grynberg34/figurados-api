const connection = require('../config/database');
const { DataTypes } = require('sequelize');

const Palpite = connection.define('Palpite', {
    id: { 
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true   
    },
    opção: { 
      type: DataTypes.STRING,
      unique: true,
    },
    imagem: { 
      type: DataTypes.STRING,
      unique: true,
    },
    tipo: { 
      type: DataTypes.STRING,
    },
},{
  tableName: 'palpites'
});

module.exports = Palpite;
