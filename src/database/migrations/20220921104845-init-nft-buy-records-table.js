'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('nft-buy-records', {
      id: {
        type: Sequelize.UUID,
        comment: 'id',
        allowNull: false,
        primaryKey: true,
      },
      nftBuyId: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      nftBuyTaskId: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      userId: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      amount: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      orderId: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      genesis: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      codehash: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      tokenIndex: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable('nft-buy-records');
  },
};
