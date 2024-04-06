'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('figurinhas', {
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
      }, 
      {
        tableName: 'figurinhas'
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('figurinhas');
  }
};
