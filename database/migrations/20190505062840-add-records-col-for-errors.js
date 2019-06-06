'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const {TEXT} = Sequelize;
    await queryInterface.addColumn('errors', 'records', {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue:'[]'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('errors', 'records');
  }
};
