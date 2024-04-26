'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('palpites_user', {
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
        tableName: 'palpites_user'
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('palpites_user');
  }
};
