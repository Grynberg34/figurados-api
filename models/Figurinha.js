const connection = require('../config/database');
const { DataTypes } = require('sequelize');

const Figurinha = connection.define('Figurinha', {
    id: { 
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true   
    },
    nome_oficial: { 
      type: DataTypes.STRING,
      unique: true,
    },
    data: { 
      type: DataTypes.DATE,
      allowNull: true
    },
    youtube: { 
      type: DataTypes.STRING,
      allowNull: true
    },
    imagem: { 
      type: DataTypes.STRING,
    },
    dica: { 
      type: DataTypes.INTEGER
    },
    anos: { 
      type: DataTypes.STRING,
    }
},{
  tableName: 'figurinhas'
});



module.exports = Figurinha;
