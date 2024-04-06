'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('users', {
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
      }, 
      {
        tableName: 'users'
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
