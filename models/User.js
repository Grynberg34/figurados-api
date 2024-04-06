const connection = require('../config/database');
const { DataTypes } = require('sequelize');

const User = connection.define('User', {
    id: { 
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true   
    },
    name: { 
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    email: { 
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    google_id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
},{
  tableName: 'users'
});

module.exports = User;
