'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('alternativas', {
      id: { 
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true   
      },
      nome_alternativo: { 
        type: DataTypes.STRING,
        unique: true,
      },
      figurinha_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'figurinhas'
          },
          key: 'id',
          as: 'figurinha_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      }, 
      {
        tableName: 'alternativas'
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('alternativas');
  }
};
