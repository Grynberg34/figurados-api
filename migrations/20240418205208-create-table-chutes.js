'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('chutes', {
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
      chute_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'figurados'
          },
          key: 'id',
          as: 'chute_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id',
          as: 'user_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      resultado: {
        type: DataTypes.BOOLEAN,
      }
      }, 
      {
        tableName: 'chutes'
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('chutes');
  }
};
