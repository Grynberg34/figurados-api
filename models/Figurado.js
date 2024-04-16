const connection = require('../config/database');
const { DataTypes } = require('sequelize');

const Figurado = connection.define('Figurado', {
    id: { 
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true   
    },
    nome: { 
      type: DataTypes.STRING,
    },
    data: { 
      type: DataTypes.STRING,
      allowNull: true
    },
    número: { 
      type: DataTypes.INTEGER,
      allowNull: true
    },
    youtube: { 
      type: DataTypes.STRING,
      allowNull: true
    },
    wikipedia: { 
      type: DataTypes.STRING,
      allowNull: true
    },
    imagem: { 
      type: DataTypes.STRING,
      allowNull: true
    },
    dica: { 
      type: DataTypes.INTEGER,
      allowNull: true
    },
    anos: { 
      type: DataTypes.STRING,
      allowNull: true
    }
},{
  tableName: 'figurados'
});



module.exports = Figurado;
