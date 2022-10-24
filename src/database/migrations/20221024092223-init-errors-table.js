'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('errors', {
      id: {
        type: Sequelize.UUID,
        comment: 'id',
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(128),
        allowNull: false,
        unique: false,
        comment: '错误标题',
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: false,
        comment: '错误信息',
      },
      category: {
        type: Sequelize.STRING(128),
        allowNull: false,
        unique: false,
        comment: '错误类型',
      },
      level: {
        type: Sequelize.STRING(128),
        allowNull: false,
        unique: false,
        comment: '信息类型',
      },
      row: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        comment: '行数',
      },
      col: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        comment: '列数',
      },
      user: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        comment: '触发用户',
      },
      ua: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        comment: 'ua',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('errors');
  },
};
