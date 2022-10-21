'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('nft-buy-tasks', {
      id: {
        type: Sequelize.UUID,
        comment: 'id',
        allowNull: false,
        primaryKey: true,
      },
      topicType: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      count: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nftBuyId: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      userId: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '状态 0: 未完成， 1:已完成',
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
    await queryInterface.dropTable('nft-buy-tasks');
  },
};
