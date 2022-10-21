'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('nft-sale-records', {
      id: {
        type: Sequelize.UUID,
        comment: 'id',
        allowNull: false,
        primaryKey: true,
      },
      nftSaleId: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      nftSaleTaskId: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      userId: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      txId: {
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
      amount: {
        type: Sequelize.BIGINT,
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
    await queryInterface.dropTable('nft-sale-records');
  },
};
