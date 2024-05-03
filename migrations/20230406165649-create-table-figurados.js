'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('figurados', {
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
      dica_2: { 
        type: DataTypes.INTEGER,
        allowNull: true
      },
      }, 
      {
        tableName: 'figurados'
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('figurados');
  }
};
