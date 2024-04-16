'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('certos', {
      id: { 
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true   
      },
      figurado_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'figurados'
          },
          key: 'id',
          as: 'figurado_id'
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
        tableName: 'certos'
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('certos');
  }
};
