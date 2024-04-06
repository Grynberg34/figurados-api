'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('palpites_certos', {
      id: { 
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true   
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
      palpite_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'palpites'
          },
          key: 'id',
          as: 'palpite_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      }, 
      {
        tableName: 'palpites_certos'
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('palpites_certos');
  }
};
