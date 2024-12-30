'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('palpites', {
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
      }, 
      {
        tableName: 'palpites'
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('palpites');
  }
};
