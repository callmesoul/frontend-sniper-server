'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const {INTEGER, DATE, STRING,BOOLEAN,DECIMAL} = Sequelize;
    await queryInterface.addColumn('errors', 'device', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('errors', 'device');
  }
};
